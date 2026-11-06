import type { FieldHook, GlobalConfig, PayloadRequest, TextField } from "payload";
import { isAdminOrAbove, isSuperAdmin } from "../access";
import { isSealed, seal } from "../../lib/secret-box";
import { restOf, wakeAll } from "../../lib/email/failover";
import { getEmailConfig, sendTemplate } from "../../lib/email/send";

/**
 * Secrets (API key, SMTP password) are write-only: encrypted when saved, never sent back to the browser,
 * and an empty field keeps the stored value.
 * The Super Admin must be able to "read" the field, or Payload leaves it out of the form entirely;
 * afterRead blanks the value instead, except for the server reading it with `context.withSecrets`.
 */
const keepOrSeal: FieldHook = async ({ value, siblingData, siblingDocWithLocales, path, req }) => {
  const segments = Array.isArray(path) ? path : [path];
  const name = String(segments[segments.length - 1]);
  if (value === "__clear__") return null;
  if (value !== undefined && value !== null && value !== "") return isSealed(value) ? value : seal(String(value).trim());
  if (segments.length === 1) {
    // The raw stored value: the other copies of the document have already been blanked by afterRead.
    return (siblingDocWithLocales as Record<string, unknown> | undefined)?.[name] ?? null;
  }
  // A backup: rows can be reordered, so its stored value is found by row id.
  // Not passing `req` on purpose: it would carry withSecrets into the reply to the browser.
  const stored = await req.payload.findGlobal({ slug: "email-settings", overrideAccess: true, depth: 0, context: { withSecrets: true } });
  const rows = (stored as unknown as { backups?: Record<string, unknown>[] }).backups ?? [];
  return rows.find((r) => r.id === (siblingData as { id?: unknown }).id)?.[name] ?? null;
};

const hideSecret: FieldHook = ({ value, req }) => (req.context?.withSecrets ? value : value ? "" : value);

type Condition = (data: Partial<Record<string, unknown>>, siblingData: Partial<Record<string, unknown>>) => boolean;

const superAdminOnly = { read: ({ req }: { req: PayloadRequest }) => isSuperAdmin(req), update: ({ req }: { req: PayloadRequest }) => isSuperAdmin(req) };

const secret = (name: string, label: { en: string; fr: string }, condition: { condition: Condition }): TextField => ({
  name,
  type: "text",
  label,
  access: superAdminOnly,
  hooks: { beforeChange: [keepOrSeal], afterRead: [hideSecret] },
  admin: {
    ...condition,
    autoComplete: "new-password",
    description: {
      en: "Saved encrypted and never shown again. Leave empty to keep the current value; type __clear__ to delete it.",
      fr: "Enregistré chiffré et jamais réaffiché. Laissez vide pour conserver la valeur actuelle ; tapez __clear__ pour la supprimer.",
    },
  },
});

export const EmailSettings: GlobalConfig = {
  slug: "email-settings",
  label: { en: "Email settings", fr: "Paramètres e-mail" },
  admin: {
    hideAPIURL: true,
    group: { en: "Settings", fr: "Paramètres" },
    description: {
      en: "How the website sends emails: contact-form notifications, replies to visitors, password resets and welcome emails.",
      fr: "Comment le site envoie ses e-mails : notifications du formulaire de contact, réponses aux visiteurs, réinitialisations de mot de passe et e-mails de bienvenue.",
    },
  },
  access: { read: ({ req }) => isAdminOrAbove(req), update: ({ req }) => isAdminOrAbove(req) },
  hooks: { afterChange: [({ doc }) => (wakeAll(), doc)] },
  fields: [
    {
      name: "status",
      type: "ui",
      admin: { components: { Field: "/components/admin/email-test#EmailTest" } },
    },
    {
      type: "collapsible",
      label: { en: "Sending service", fr: "Service d’envoi" },
      admin: { description: { en: "Only the Super Admin can change the service and its credentials.", fr: "Seul le super administrateur peut modifier le service et ses identifiants." } },
      fields: [
        {
          name: "provider",
          type: "radio",
          defaultValue: "off",
          label: { en: "Send emails with", fr: "Envoyer les e-mails avec" },
          access: { update: ({ req }) => isSuperAdmin(req) },
          options: [
            { value: "resend", label: { en: "Resend (recommended)", fr: "Resend (recommandé)" } },
            { value: "smtp", label: { en: "Another email server (SMTP: Brevo, Zoho, Gmail…)", fr: "Un autre serveur e-mail (SMTP : Brevo, Zoho, Gmail…)" } },
            { value: "off", label: { en: "Off (enquiries are still saved in the admin)", fr: "Désactivé (les demandes restent enregistrées dans l’administration)" } },
          ],
        },
        secret("resendApiKey", { en: "Resend API key", fr: "Clé API Resend" }, { condition: (d) => d?.provider === "resend" }),
        {
          type: "row",
          admin: { condition: (d) => d?.provider === "smtp" },
          fields: [
            { name: "smtpHost", type: "text", label: { en: "Server (host)", fr: "Serveur (hôte)" }, access: { update: ({ req }) => isSuperAdmin(req) }, admin: { width: "50%", placeholder: "smtp-relay.brevo.com" } },
            { name: "smtpPort", type: "number", defaultValue: 587, label: { en: "Port", fr: "Port" }, access: { update: ({ req }) => isSuperAdmin(req) }, admin: { width: "20%" } },
            { name: "smtpSecure", type: "checkbox", label: { en: "SSL (port 465)", fr: "SSL (port 465)" }, access: { update: ({ req }) => isSuperAdmin(req) }, admin: { width: "30%" } },
          ],
        },
        {
          name: "smtpUser",
          type: "text",
          label: { en: "Username", fr: "Identifiant" },
          access: { update: ({ req }) => isSuperAdmin(req) },
          admin: { condition: (d) => d?.provider === "smtp" },
        },
        secret("smtpPassword", { en: "Password or SMTP key", fr: "Mot de passe ou clé SMTP" }, { condition: (d) => d?.provider === "smtp" }),
        {
          name: "useBackups",
          type: "checkbox",
          label: { en: "Use backup services when this one reaches its limit or fails", fr: "Utiliser des services de secours quand celui-ci atteint sa limite ou échoue" },
          access: { update: ({ req }) => isSuperAdmin(req) },
          admin: { condition: (d) => d?.provider !== "off" },
        },
        {
          name: "backups",
          type: "array",
          label: { en: "Backup services", fr: "Services de secours" },
          labels: { singular: { en: "Backup", fr: "Service de secours" }, plural: { en: "Backups", fr: "Services de secours" } },
          access: superAdminOnly,
          admin: {
            condition: (d) => d?.provider !== "off" && Boolean(d?.useBackups),
            description: {
              en: "Tried from top to bottom; drag to change the order. A service that reaches its daily limit rests until the limit resets, and the next email goes straight to the next one. Your sender address must be verified with every service here, so send each one a test above.",
              fr: "Essayés de haut en bas ; faites glisser pour changer l’ordre. Un service qui atteint sa limite quotidienne se repose jusqu’à sa réinitialisation, et l’e-mail suivant part directement avec le suivant. Votre adresse d’expéditeur doit être vérifiée auprès de chaque service : testez-les tous ci-dessus.",
            },
          },
          fields: [
            {
              type: "row",
              fields: [
                { name: "name", type: "text", label: { en: "Name", fr: "Nom" }, admin: { width: "50%", placeholder: "Brevo" } },
                {
                  name: "kind",
                  type: "select",
                  defaultValue: "smtp",
                  required: true,
                  label: { en: "Type", fr: "Type" },
                  admin: { width: "50%" },
                  options: [
                    { value: "smtp", label: { en: "Email server (SMTP)", fr: "Serveur e-mail (SMTP)" } },
                    { value: "resend", label: "Resend" },
                  ],
                },
              ],
            },
            secret("apiKey", { en: "Resend API key", fr: "Clé API Resend" }, { condition: (_, row) => row?.kind === "resend" }),
            {
              type: "row",
              admin: { condition: (_, row) => row?.kind === "smtp" },
              fields: [
                { name: "smtpHost", type: "text", label: { en: "Server (host)", fr: "Serveur (hôte)" }, admin: { width: "50%", placeholder: "smtp-relay.brevo.com" } },
                { name: "smtpPort", type: "number", defaultValue: 587, label: { en: "Port", fr: "Port" }, admin: { width: "20%" } },
                { name: "smtpSecure", type: "checkbox", label: { en: "SSL (port 465)", fr: "SSL (port 465)" }, admin: { width: "30%" } },
              ],
            },
            { name: "smtpUser", type: "text", label: { en: "Username", fr: "Identifiant" }, admin: { condition: (_, row) => row?.kind === "smtp" } },
            secret("smtpPassword", { en: "Password or SMTP key", fr: "Mot de passe ou clé SMTP" }, { condition: (_, row) => row?.kind === "smtp" }),
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: { en: "Sender", fr: "Expéditeur" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "fromName", type: "text", defaultValue: "Surface Legend", label: { en: "Sender name", fr: "Nom de l’expéditeur" }, admin: { width: "50%" } },
            {
              name: "fromAddress",
              type: "email",
              defaultValue: "website@surfacelegend.com",
              label: { en: "Sender address", fr: "Adresse de l’expéditeur" },
              admin: { width: "50%", description: { en: "Must be on a domain verified with the sending service.", fr: "Doit appartenir à un domaine vérifié auprès du service d’envoi." } },
            },
          ],
        },
        {
          name: "replyTo",
          type: "email",
          defaultValue: "info@surfacelegend.com",
          label: { en: "Replies go to", fr: "Les réponses arrivent à" },
        },
      ],
    },
    {
      type: "collapsible",
      label: { en: "Contact form", fr: "Formulaire de contact" },
      fields: [
        {
          name: "notifyTo",
          type: "array",
          label: { en: "Send new enquiries to", fr: "Envoyer les nouvelles demandes à" },
          labels: { singular: { en: "Recipient", fr: "Destinataire" }, plural: { en: "Recipients", fr: "Destinataires" } },
          defaultValue: [{ email: "info@surfacelegend.com" }],
          fields: [{ name: "email", type: "email", required: true, label: { en: "Email", fr: "E-mail" } }],
        },
        {
          name: "autoReply",
          type: "checkbox",
          defaultValue: true,
          label: { en: "Send the visitor a confirmation email", fr: "Envoyer au visiteur un e-mail de confirmation" },
        },
      ],
    },
  ],
  endpoints: [
    {
      path: "/test",
      method: "post",
      handler: async (req: PayloadRequest) => {
        if (!isAdminOrAbove(req)) return Response.json({ ok: false, error: "Not allowed" }, { status: 403 });
        const user = req.user as { email?: string; name?: string } | null;
        const config = await getEmailConfig(req.payload);
        const lang = req.i18n?.language === "fr" ? "fr" : "en";
        const body = (await req.json?.().catch(() => ({}))) as { service?: string } | undefined;
        // One service at a time, with no failover: a test must say whether this service works.
        const service = config.services.find((s) => s.id === body?.service) ?? config.services[0];
        if (!service) return Response.json({ ok: false, provider: "off", error: lang === "fr" ? "Aucun service d’envoi n’est configuré." : "No sending service is set up." });
        const result = await sendTemplate(req.payload, "test-email", lang, user?.email ?? "", { name: user?.name ?? "", provider: service.name }, { config: { ...config, services: [service] } });
        return Response.json({ ...result, to: user?.email, source: config.source });
      },
    },
    {
      path: "/status",
      method: "get",
      handler: async (req: PayloadRequest) => {
        if (!isAdminOrAbove(req)) return Response.json({ ok: false }, { status: 403 });
        const c = await getEmailConfig(req.payload);
        return Response.json({
          provider: c.provider,
          source: c.source,
          from: `${c.fromName} <${c.fromAddress}>`,
          notifyTo: c.notifyTo,
          incomplete: c.incomplete,
          // Names and state only. The Super Admin also sees a key's last characters, to recognise it in Resend.
          services: c.services.map((s) => ({ id: s.id, name: s.name, rest: restOf(s.id), keyEnd: isSuperAdmin(req) && s.apiKey ? s.apiKey.slice(-4) : undefined })),
        });
      },
    },
  ],
};
