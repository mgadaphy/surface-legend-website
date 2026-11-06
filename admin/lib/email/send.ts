import nodemailer from "nodemailer";
import type { Payload } from "payload";
import { unseal } from "../secret-box";
import { DEFAULT_TEMPLATES, type TemplateKey } from "./defaults";
import { judge, rest, restOf, wake, type Failure } from "./failover";
import { renderEmail, type TemplateContent, type Vars } from "./render";

export type Provider = "resend" | "smtp" | "off";
export type EmailService = {
  id: string;
  name: string;
  kind: "resend" | "smtp";
  apiKey?: string;
  smtp?: { host: string; port: number; secure: boolean; user?: string; pass?: string };
};
export type EmailConfig = {
  /** The first service to try; "off" when there is none. */
  provider: Provider;
  /** Tried in this order: the main service, then the backups. */
  services: EmailService[];
  /** Backups left out because their key or server is missing. */
  incomplete: string[];
  source: "admin" | "environment" | "none";
  fromName: string;
  fromAddress: string;
  replyTo?: string;
  notifyTo: string[];
  autoReply: boolean;
};
export type SendResult = { ok: boolean; provider: Provider; service?: string; id?: string; error?: string };
export type Message = { to: string | string[]; subject: string; html: string; text: string; replyTo?: string };

/** Email settings from the admin, or from the server's .env, in that order. Secrets are decrypted here only. */
export async function getEmailConfig(payload: Payload): Promise<EmailConfig> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let s: any = {};
  try {
    s = await payload.findGlobal({ slug: "email-settings", overrideAccess: true, depth: 0, showHiddenFields: true, context: { withSecrets: true } });
  } catch {
    s = {};
  }
  const notifyTo = (s.notifyTo ?? []).map((r: { email?: string }) => r.email).filter(Boolean) as string[];
  const base = {
    fromName: s.fromName || process.env.CONTACT_FROM_NAME || "Surface Legend",
    fromAddress: s.fromAddress || process.env.CONTACT_FROM_ADDRESS || "website@surfacelegend.com",
    replyTo: s.replyTo || undefined,
    notifyTo: notifyTo.length ? notifyTo : (process.env.CONTACT_TO || "info@surfacelegend.com").split(",").map((x) => x.trim()),
    autoReply: s.autoReply !== false,
  };
  const none = { ...base, provider: "off" as const, services: [], incomplete: [], source: "none" as const };
  if (s.provider === "off") return none;
  const smtpName = (host: string) => `SMTP (${host})`;
  let main: EmailService | null = null;
  let source: EmailConfig["source"] = "admin";
  if (s.provider === "resend" && s.resendApiKey) {
    main = { id: "main", name: "Resend", kind: "resend", apiKey: unseal(s.resendApiKey) };
  } else if (s.provider === "smtp" && s.smtpHost) {
    main = {
      id: "main",
      name: smtpName(s.smtpHost),
      kind: "smtp",
      smtp: { host: s.smtpHost, port: Number(s.smtpPort || 587), secure: Boolean(s.smtpSecure), user: s.smtpUser || undefined, pass: unseal(s.smtpPassword) || undefined },
    };
  } else if (process.env.RESEND_API_KEY) {
    main = { id: "main", name: "Resend", kind: "resend", apiKey: process.env.RESEND_API_KEY };
    source = "environment";
  } else if (process.env.SMTP_HOST) {
    main = {
      id: "main",
      name: smtpName(process.env.SMTP_HOST),
      kind: "smtp",
      smtp: { host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === "true", user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    };
    source = "environment";
  }
  const services: EmailService[] = main ? [main] : [];
  const incomplete: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of (s.useBackups ? s.backups ?? [] : []) as any[]) {
    const id = `backup:${row.id}`;
    if (row.kind === "resend" && row.apiKey) services.push({ id, name: row.name || "Resend", kind: "resend", apiKey: unseal(row.apiKey) });
    else if (row.kind === "smtp" && row.smtpHost) {
      services.push({
        id,
        name: row.name || smtpName(row.smtpHost),
        kind: "smtp",
        smtp: { host: row.smtpHost, port: Number(row.smtpPort || 587), secure: Boolean(row.smtpSecure), user: row.smtpUser || undefined, pass: unseal(row.smtpPassword) || undefined },
      });
    } else incomplete.push(row.name || "?");
  }
  if (!services.length) return { ...none, incomplete };
  return { ...base, provider: services[0].kind, services, incomplete, source };
}

class SendFailure extends Error {
  constructor(readonly failure: Failure) {
    super(failure.text);
  }
}

/** One attempt with one service. Throws a SendFailure, or a plain error from the network or the mail server. */
async function deliver(service: EmailService, from: string, to: string[], replyTo: string | undefined, msg: Message) {
  if (service.kind === "resend") {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${service.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject: msg.subject, html: msg.html, text: msg.text, ...(replyTo ? { reply_to: replyTo } : {}) }),
      signal: AbortSignal.timeout(15000),
    });
    const data = (await res.json().catch(() => ({}))) as { id?: string; name?: string; message?: string };
    if (!res.ok) throw new SendFailure({ status: res.status, code: data.name, text: data.message || `Resend error ${res.status}` });
    return data.id;
  }
  const smtp = service.smtp as NonNullable<EmailService["smtp"]>;
  const transport = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
    connectionTimeout: 15000,
  });
  const info = await transport.sendMail({ from, to, subject: msg.subject, html: msg.html, text: msg.text, replyTo });
  return info.messageId as string;
}

function toFailure(err: unknown): Failure {
  if (err instanceof SendFailure) return err.failure;
  const e = err as { responseCode?: number; code?: string; response?: string; message?: string };
  return { status: e?.responseCode, code: e?.code, text: e?.response || e?.message || String(err) };
}

/** Tries each service in order, skipping those resting after a limit; if all are resting, tries them anyway. */
export async function sendEmail(payload: Payload, msg: Message, config?: EmailConfig): Promise<SendResult> {
  const cfg = config ?? (await getEmailConfig(payload));
  if (!cfg.services.length) return { ok: false, provider: "off", error: "Email sending is not set up yet (admin: Settings, Email settings)." };
  const from = `${cfg.fromName} <${cfg.fromAddress}>`;
  const to = Array.isArray(msg.to) ? msg.to : [msg.to];
  const replyTo = msg.replyTo || cfg.replyTo;
  const ready = cfg.services.filter((s) => !restOf(s.id));
  const order = ready.length ? ready : cfg.services;
  const errors: { name: string; text: string }[] = [];
  for (const service of order) {
    try {
      const id = await deliver(service, from, to, replyTo, msg);
      wake(service.id);
      return { ok: true, provider: service.kind, service: service.name, id };
    } catch (err) {
      const failure = toFailure(err);
      const verdict = judge(service.kind, failure);
      if (verdict.reason) rest(service.id, verdict.reason);
      errors.push({ name: service.name, text: failure.text });
      payload.logger.warn(`[email] ${service.name} failed (${verdict.reason ?? "message refused"}): ${failure.text}`);
      if (!verdict.tryNext) break;
    }
  }
  const error = errors.length === 1 ? errors[0].text : errors.map((e) => `${e.name}: ${e.text}`).join(" | ");
  return { ok: false, provider: order[0].kind, error };
}

/** The editable template from the admin in the requested language, or the built-in default. */
export async function loadTemplate(payload: Payload, key: TemplateKey, lang: "en" | "fr"): Promise<TemplateContent> {
  const fallback = DEFAULT_TEMPLATES[key][lang];
  try {
    const { docs } = await payload.find({ collection: "email-templates", where: { key: { equals: key } }, locale: lang, limit: 1, depth: 0, overrideAccess: true });
    const d = docs[0];
    if (!d?.subject || !d?.body) return fallback;
    return { subject: d.subject, heading: d.heading || "", body: d.body, buttonLabel: d.buttonLabel || "", buttonUrl: d.buttonUrl || "" };
  } catch {
    return fallback;
  }
}

export async function sendTemplate(
  payload: Payload,
  key: TemplateKey,
  lang: "en" | "fr",
  to: string | string[],
  vars: Vars,
  opts: { replyTo?: string; config?: EmailConfig } = {},
): Promise<SendResult> {
  const tpl = await loadTemplate(payload, key, lang);
  const { subject, html, text } = renderEmail(tpl, vars, lang);
  return sendEmail(payload, { to, subject, html, text, replyTo: opts.replyTo }, opts.config);
}
