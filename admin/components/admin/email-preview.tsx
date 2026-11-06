"use client";

import { useMemo } from "react";
import { useFormFields, useLocale, useTranslation } from "@payloadcms/ui";
import { renderEmail } from "@/lib/email/render";
import type { TemplateKey } from "@/lib/email/defaults";

/** Sample values so the preview looks like a real email. */
const SAMPLE: Record<string, string> = {
  name: "Mme Ojong",
  email: "client@example.com",
  phone: "+237 6XX XXX XXX",
  type: "School management software",
  detail: "Residential Painting",
  message: "Hello, we would like a demo of the school software for our two campuses.",
  language: "English",
  role: "Editor",
  provider: "Resend",
  adminUrl: "https://surfacelegend.com/admin",
  loginUrl: "https://surfacelegend.com/admin",
  resetUrl: "https://surfacelegend.com/admin/reset/example",
  whatsappUrl: "https://wa.me/237651160704",
  siteUrl: "https://surfacelegend.com",
};

/** The email's body, with the logo loaded from this site (the admin may not reach surfacelegend.com, e.g. offline). */
const previewMarkup = (html: string) =>
  (html.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] ?? html).replace(/src="https?:\/\/[^"]+\/icon-192\.png"/, 'src="/icon-192.png"');

/** Live preview of the email being edited, in the language selected at the top right. */
export function EmailPreview() {
  const { i18n } = useTranslation();
  const t = (en: string, fr: string) => (i18n?.language === "fr" ? fr : en);
  const lang = useLocale()?.code === "fr" ? "fr" : "en";
  const key = useFormFields(([f]) => f.key?.value as TemplateKey | undefined);
  const subject = useFormFields(([f]) => (f.subject?.value as string) ?? "");
  const heading = useFormFields(([f]) => (f.heading?.value as string) ?? "");
  const body = useFormFields(([f]) => (f.body?.value as string) ?? "");
  const buttonLabel = useFormFields(([f]) => (f.buttonLabel?.value as string) ?? "");
  const buttonUrl = useFormFields(([f]) => (f.buttonUrl?.value as string) ?? "");

  const email = useMemo(() => {
    const vars = { ...SAMPLE, language: lang === "fr" ? "Français" : "English", role: lang === "fr" ? "Éditeur" : "Editor" };
    return renderEmail({ subject, heading, body, buttonLabel, buttonUrl }, vars, lang);
  }, [subject, heading, body, buttonLabel, buttonUrl, lang]);

  if (!key) return null;
  return (
    <div className="sl-panel">
      <p className="sl-panel-title">{t("Preview (with example details)", "Aperçu (avec des exemples)")}</p>
      <p>
        <span className="sl-note">{t("Subject:", "Objet :")}</span> <strong>{email.subject}</strong>
      </p>
      {/* renderEmail escapes all text and only allows http(s)/mailto links, so its markup is safe to show here. */}
      <div className="sl-email-frame" dangerouslySetInnerHTML={{ __html: previewMarkup(email.html) }} />
    </div>
  );
}
