"use client";

/* eslint-disable @next/next/no-img-element */
import { useTranslation } from "@payloadcms/ui";
import { ThemeToggle } from "./theme-toggle";

const useT = () => {
  const { i18n } = useTranslation();
  return (en: string, fr: string) => (i18n?.language === "fr" ? fr : en);
};

/** Sign-in screen, before the form: the brand panel (left on wide screens, a band on phones) and the heading. */
export function LoginIntro() {
  const t = useT();
  return (
    <>
      <aside className="sl-login-panel" aria-hidden="true">
        <div className="sl-login-panel__brand">
          <img className="sl-login-panel__logo" src="/brand/symbol-white.png" alt="" width={66} height={59} />
          <span>Surface Legend</span>
        </div>
        <p className="sl-login-panel__line">{t("Your website, your enquiries, in one place.", "Votre site et vos demandes, au même endroit.")}</p>
        <p className="sl-login-panel__detail">
          {t("Portfolio, testimonials, enquiries and business details, in English and French.", "Réalisations, témoignages, demandes et informations de l’entreprise, en français et en anglais.")}
        </p>
      </aside>
      <div className="sl-login-head">
        <h1>{t("Sign in", "Connexion")}</h1>
        <p>{t("Use the email address your account was created with.", "Utilisez l’adresse e-mail avec laquelle votre compte a été créé.")}</p>
      </div>
    </>
  );
}

/** Sign-in screen, after the form: theme switch and the way back to the website. */
export function LoginFooter() {
  const t = useT();
  return (
    <>
      <ThemeToggle className="sl-login-theme" />
      <a className="sl-login-back" href="/">
        {t("Back to surfacelegend.com", "Retour à surfacelegend.com")}
      </a>
    </>
  );
}
