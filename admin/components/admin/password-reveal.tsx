"use client";

import { useEffect, type ReactNode } from "react";

const EYE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.1 3.9M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';

/**
 * Adds a show/hide button to every password field in the admin (sign in, reset, new account,
 * change password). Payload renders those fields itself, so the button is attached when they appear.
 */
function enhance(input: HTMLInputElement) {
  if (input.dataset.mgdReveal) return;
  input.dataset.mgdReveal = "1";
  const fr = document.documentElement.lang === "fr";
  const wrap = input.parentElement;
  if (!wrap) return;
  wrap.classList.add("sl-reveal-wrap");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "sl-reveal";
  const update = () => {
    const shown = input.type === "text";
    button.innerHTML = shown ? EYE_OFF : EYE;
    button.setAttribute("aria-pressed", String(shown));
    const label = shown ? (fr ? "Masquer le mot de passe" : "Hide password") : fr ? "Afficher le mot de passe" : "Show password";
    button.setAttribute("aria-label", label);
    button.title = label;
  };
  button.addEventListener("click", () => {
    input.type = input.type === "password" ? "text" : "password";
    update();
    input.focus();
  });
  // Never leave a password visible when the form is sent.
  input.form?.addEventListener("submit", () => {
    input.type = "password";
    update();
  });
  update();
  wrap.appendChild(button);
}

export function PasswordReveal({ children }: { children?: ReactNode }) {
  useEffect(() => {
    const scan = () => document.querySelectorAll<HTMLInputElement>('input[type="password"]:not([data-sl-reveal])').forEach(enhance);
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return <>{children}</>;
}
