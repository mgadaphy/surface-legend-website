"use client";

import { useState } from "react";
import { useFormFields, useTranslation } from "@payloadcms/ui";

/** Quick replies for an enquiry: email, WhatsApp, copy. */
export function EnquiryActions() {
  const { i18n } = useTranslation();
  const t = (en: string, fr: string) => (i18n?.language === "fr" ? fr : en);
  const name = useFormFields(([f]) => (f.name?.value as string) ?? "");
  const email = useFormFields(([f]) => (f.email?.value as string) ?? "");
  const phone = useFormFields(([f]) => (f.phone?.value as string) ?? "");
  const type = useFormFields(([f]) => (f.type?.value as string) ?? "");
  const lang = useFormFields(([f]) => (f.locale?.value as string) ?? "en");
  const [copied, setCopied] = useState(false);
  if (!email) return null;

  const first = name.split(" ")[0] || name;
  const greeting = lang === "fr" ? `Bonjour ${first},\n\n` : `Hello ${first},\n\n`;
  const subject = lang === "fr" ? `Re : votre demande${type ? ` (${type})` : ""}` : `Re: your enquiry${type ? ` (${type})` : ""}`;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(greeting)}`;
  // WhatsApp needs digits only, with the country code (Cameroon by default for 9-digit numbers).
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 9) digits = `237${digits}`;
  const whatsapp = digits.length >= 10 ? `https://wa.me/${digits}?text=${encodeURIComponent(greeting.trim())}` : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="sl-panel sl-row">
      <a className="sl-btn sl-btn-primary" href={mailto}>
        {t("Reply by email", "Répondre par e-mail")}
      </a>
      {whatsapp && (
        <a className="sl-btn" href={whatsapp} target="_blank" rel="noreferrer">
          {t("Reply on WhatsApp", "Répondre sur WhatsApp")}
        </a>
      )}
      <button type="button" className="sl-btn" onClick={copy}>
        {copied ? t("Copied", "Copié") : t("Copy email address", "Copier l’adresse e-mail")}
      </button>
      <span className="sl-note">{t("After replying, set the status to “Replied”.", "Après avoir répondu, passez le statut à « Répondu ».")}</span>
    </div>
  );
}
