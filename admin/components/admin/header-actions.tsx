"use client";

import { useTranslation } from "@payloadcms/ui";
import { ThemeToggle } from "./theme-toggle";

/** Top bar, right side: open the public website, and the light/dark switch. */
export function HeaderActions() {
  const { i18n } = useTranslation();
  const fr = i18n?.language === "fr";
  return (
    <div className="sl-header-actions">
      <a className="sl-header-link" href={fr ? "/?lang=fr" : "/?lang=en"} target="_blank" rel="noreferrer">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
        </svg>
        <span>{fr ? "Voir le site" : "View website"}</span>
      </a>
      <ThemeToggle />
    </div>
  );
}
