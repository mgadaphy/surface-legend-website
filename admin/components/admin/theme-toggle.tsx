"use client";

import { useTheme, useTranslation } from "@payloadcms/ui";

/** Light/dark switch for the admin. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();
  const fr = i18n?.language === "fr";

  const next = theme === "dark" ? "light" : "dark";
  const label = next === "dark" ? (fr ? "Passer en mode sombre" : "Switch to dark mode") : fr ? "Passer en mode clair" : "Switch to light mode";

  return (
    <button
      type="button"
      className={`sl-theme-toggle ${className}`}
      aria-label={label}
      title={label}
      onClick={() => setTheme(next)}
    >
      {/* Both drawn; CSS shows the one for the current theme, so there is no flash on load. */}
      <svg className="sl-theme-toggle__sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
      </svg>
      <svg className="sl-theme-toggle__moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
      </svg>
    </button>
  );
}
