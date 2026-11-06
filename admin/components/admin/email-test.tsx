"use client";

import { useEffect, useState } from "react";
import { useAuth, useTranslation } from "@payloadcms/ui";

type RestReason = "daily" | "monthly" | "minute" | "credentials";
type Service = { id: string; name: string; rest: { until: number; reason: RestReason } | null; keyEnd?: string };
type Status = { provider: "resend" | "smtp" | "off"; source: "admin" | "environment" | "none"; from: string; notifyTo: string[]; incomplete: string[]; services: Service[] };

/** Top of Email settings: what is set up now, and a button that sends a test email to the signed-in user. */
export function EmailTest() {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const t = (en: string, fr: string) => (i18n?.language === "fr" ? fr : en);
  const [status, setStatus] = useState<Status | null>(null);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = () =>
    fetch("/cms-api/globals/email-settings/status", { credentials: "include" })
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus(null));
  useEffect(() => {
    load();
  }, []);

  async function sendTest(service?: Service) {
    setBusy(service?.id ?? "main");
    setResult(null);
    try {
      const res = await fetch("/cms-api/globals/email-settings/test", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: service?.id }),
      });
      const data = await res.json();
      setResult(
        data.ok
          ? { ok: true, text: t(`Sent to ${data.to} with ${data.service}. Check the inbox (and spam folder).`, `Envoyé à ${data.to} avec ${data.service}. Vérifiez la boîte de réception (et les indésirables).`) }
          : { ok: false, text: data.error || t("Sending failed.", "L’envoi a échoué.") },
      );
    } catch {
      setResult({ ok: false, text: t("Sending failed.", "L’envoi a échoué.") });
    }
    setBusy(null);
    load();
  }

  const [main, ...backups] = status?.services ?? [];
  const provider = main?.name ?? t("Not set up", "Non configuré");
  const keyEnd = (s?: Service) => (s?.keyEnd ? t(` (saved key ending in ${s.keyEnd})`, ` (clé enregistrée se terminant par ${s.keyEnd})`) : "");
  const resting = (s?: Service) => {
    if (!s?.rest) return "";
    const until = new Date(s.rest.until).toLocaleString(i18n?.language === "fr" ? "fr-FR" : "en-GB", { timeZone: "UTC", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
    const why = {
      daily: t("daily limit reached", "limite quotidienne atteinte"),
      monthly: t("monthly limit reached", "limite mensuelle atteinte"),
      minute: t("busy or too many at once", "occupé ou trop d’envois à la fois"),
      credentials: t("key, login or sender address refused", "clé, identifiant ou adresse d’expéditeur refusés"),
    }[s.rest.reason];
    return t(` (resting until ${until} UTC: ${why})`, ` (au repos jusqu’au ${until} UTC : ${why})`);
  };
  const source =
    status?.source === "environment"
      ? t(" (from the server settings file)", " (depuis le fichier de configuration du serveur)")
      : "";

  return (
    <div className="sl-panel">
      <p className="sl-panel-title">{t("Current status", "État actuel")}</p>
      {status ? (
        <ul className="sl-facts">
          <li>
            <span>{t("Sending with", "Envoi via")}</span>
            <strong className={status.provider === "off" ? "sl-bad" : "sl-good"}>
              {provider}
              {keyEnd(main)}
              {source}
              {resting(main)}
            </strong>
          </li>
          {backups.map((s, i) => (
            <li key={s.id}>
              <span>{t(`Backup ${i + 1}`, `Secours ${i + 1}`)}</span>
              <strong className={s.rest ? "sl-bad" : "sl-good"}>
                {s.name}
                {keyEnd(s)}
                {resting(s)}
              </strong>
            </li>
          ))}
          <li>
            <span>{t("From", "Expéditeur")}</span>
            <strong>{status.from}</strong>
          </li>
          <li>
            <span>{t("Enquiries go to", "Les demandes vont à")}</span>
            <strong>{status.notifyTo.join(", ")}</strong>
          </li>
        </ul>
      ) : (
        <p>…</p>
      )}
      {status?.provider === "off" && (
        <p className="sl-note">
          {t(
            "Contact-form messages are still saved under Emails, Enquiries. Choose a sending service below to also receive them by email.",
            "Les messages du formulaire restent enregistrés dans E-mails, Demandes. Choisissez un service d’envoi ci-dessous pour les recevoir aussi par e-mail.",
          )}
        </p>
      )}
      {status && status.incomplete.length > 0 && (
        <p className="sl-note sl-bad">
          {t(`Skipped until complete (key or server missing): ${status.incomplete.join(", ")}`, `Ignorés tant qu’ils sont incomplets (clé ou serveur manquant) : ${status.incomplete.join(", ")}`)}
        </p>
      )}
      <div className="sl-row">
        <button type="button" className="sl-btn sl-btn-primary" onClick={() => sendTest(main)} disabled={Boolean(busy) || !main}>
          {busy === (main?.id ?? "main")
            ? t("Sending…", "Envoi…")
            : backups.length
              ? t(`Test ${main?.name}: send to ${user?.email ?? "me"}`, `Tester ${main?.name} : envoyer à ${user?.email ?? "moi"}`)
              : t(`Send a test email to ${user?.email ?? "me"}`, `Envoyer un e-mail de test à ${user?.email ?? "moi"}`)}
        </button>
        {backups.map((s) => (
          <button key={s.id} type="button" className="sl-btn" onClick={() => sendTest(s)} disabled={Boolean(busy)}>
            {busy === s.id ? t("Sending…", "Envoi…") : t(`Test ${s.name}`, `Tester ${s.name}`)}
          </button>
        ))}
      </div>
      {result && <p className={result.ok ? "sl-good" : "sl-bad"}>{result.text}</p>}
      <p className="sl-note">{t("Save your changes before sending a test.", "Enregistrez vos modifications avant d’envoyer un test.")}</p>
    </div>
  );
}
