import { after, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { getEmailConfig, sendTemplate } from "@/lib/email/send";

/**
 * Contact form endpoint.
 * 1. The enquiry is saved in the admin (Emails, Enquiries), so it is never lost.
 * 2. Then, after the visitor already has their answer, the team is notified by email and the
 *    visitor gets a confirmation, through the service chosen in the admin (Email settings).
 */
const MAX = { name: 120, email: 200, phone: 40, type: 80, detail: 120, message: 5000, page: 300 };

// Simple per-IP rate limit: 5 enquiries per 10 minutes per server instance.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "too-many" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Bots fill the hidden "website" field or submit within a couple of seconds; pretend success.
  if (body.website || Number(body.elapsed ?? 0) < 3000) return NextResponse.json({ ok: true });
  // Consent to process the enquiry is required (Law No. 2024/017 on personal data protection).
  if (body.consent !== "yes") return NextResponse.json({ error: "consent" }, { status: 422 });

  const field = (k: keyof typeof MAX) => String(body[k] ?? "").trim().slice(0, MAX[k]);
  const lang: "en" | "fr" = body.locale === "fr" ? "fr" : "en";
  const data = {
    name: field("name"),
    email: field("email"),
    phone: field("phone"),
    type: field("type"),
    detail: field("detail"),
    message: field("message"),
    page: field("page"),
  };
  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "missing" }, { status: 422 });
  }

  let payload;
  let enquiryId: number | string;
  try {
    payload = await getPayload({ config });
    const saved = await payload.create({
      collection: "enquiries",
      data: { ...data, locale: lang, status: "new", consentAt: new Date().toISOString() },
      overrideAccess: true,
    });
    enquiryId = saved.id;
  } catch (err) {
    console.error("[contact] could not save enquiry", err);
    return NextResponse.json({ error: "save-failed" }, { status: 500 });
  }

  // Emails are sent after the response, so the visitor never waits for (or sees) a mail server problem.
  after(async () => {
    const [cfg, settings] = await Promise.all([getEmailConfig(payload), payload.findGlobal({ slug: "site-settings", depth: 0 }).catch(() => null)]);
    const whatsapp = settings?.whatsapp || "237679235879";
    const none = lang === "fr" ? "Non précisé" : "Not provided";
    const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://surfacelegend.com").replace(/\/$/, "");
    const log = { team: "", visitor: "" };
    const stamp = (r: { ok: boolean; service?: string; error?: string }) =>
      r.ok ? `Sent ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC via ${r.service}` : `Not sent: ${r.error ?? "unknown error"}`.slice(0, 300);

    if (cfg.provider === "off") {
      log.team = "Not sent: email sending is off (Email settings)";
    } else {
      const team = await sendTemplate(
        payload,
        "enquiry-notification",
        "en",
        cfg.notifyTo,
        {
          name: data.name,
          email: data.email,
          phone: data.phone || none,
          type: data.type || none,
          detail: data.detail || none,
          message: data.message || none,
          language: lang === "fr" ? "French" : "English",
          adminUrl: `${site}/admin/collections/enquiries/${enquiryId}`,
        },
        { replyTo: data.email, config: cfg },
      );
      log.team = stamp(team);
      if (cfg.autoReply) {
        const visitor = await sendTemplate(
          payload,
          "enquiry-autoreply",
          lang,
          data.email,
          { name: data.name.split(" ")[0] || data.name, type: data.detail || data.type || (lang === "fr" ? "votre projet" : "your project"), whatsappUrl: `https://wa.me/${whatsapp}`, siteUrl: `${site}/?lang=${lang}` },
          { config: cfg },
        );
        log.visitor = stamp(visitor);
      }
    }
    await payload
      .update({ collection: "enquiries", id: enquiryId, data: { emailLog: log }, overrideAccess: true })
      .catch((err) => console.error("[contact] could not record email status", err));
  });

  return NextResponse.json({ ok: true });
}
