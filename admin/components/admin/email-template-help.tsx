"use client";

import { useFormFields, useTranslation } from "@payloadcms/ui";
import { TEMPLATE_INFO, type TemplateKey } from "@/lib/email/defaults";

/** Explains when this email is sent and which {{placeholders}} it can use. */
export function EmailTemplateHelp() {
  const { i18n } = useTranslation();
  const ui = i18n?.language === "fr" ? "fr" : "en";
  const t = (en: string, fr: string) => (ui === "fr" ? fr : en);
  const key = useFormFields(([f]) => f.key?.value as TemplateKey | undefined);
  const info = key ? TEMPLATE_INFO[key] : undefined;
  if (!info) return null;
  return (
    <div className="sl-panel">
      <p className="sl-panel-title">{info.to[ui]}</p>
      <p>
        {t("You can use:", "Vous pouvez utiliser :")}{" "}
        {info.placeholders.map((p) => (
          <code key={p} className="sl-chip">{`{{${p}}}`}</code>
        ))}
      </p>
      <p className="sl-note">
        {t(
          "In the message: a blank line starts a new paragraph, “- ” starts a bullet point, **text** is bold, [text](https://…) is a link.",
          "Dans le message : une ligne vide crée un paragraphe, « - » crée une puce, **texte** met en gras, [texte](https://…) crée un lien.",
        )}
      </p>
    </div>
  );
}
