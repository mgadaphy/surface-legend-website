/**
 * Turns an editable email template into a branded HTML email and a plain-text version.
 * Runs on the server (sending) and in the admin (live preview), so it has no Node-only code.
 *
 * Template syntax, kept simple for non-technical editors:
 *   {{name}}            placeholder, filled in when the email is sent
 *   blank line          new paragraph
 *   **bold**            bold text
 *   - item              bullet point (one per line)
 *   [text](https://…)   link
 */
export type TemplateContent = { subject: string; heading?: string; body: string; buttonLabel?: string; buttonUrl?: string };
export type Vars = Record<string, string | number | null | undefined>;

export const BRAND = {
  name: "Surface Legend",
  site: process.env.NEXT_PUBLIC_SITE_URL || "https://surfacelegend.com",
  navy: "#1e3a5f",
  teal: "#0f766e",
  ink: "#1e3a5f",
  slate: "#475569",
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Fill {{placeholders}}. Unknown placeholders become empty so a typo never shows "{{…}}" to a client. */
export function fill(text: string, vars: Vars, escape = false): string {
  return text.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, k: string) => {
    const v = vars[k];
    const s = v === null || v === undefined ? "" : String(v);
    return escape ? esc(s) : s;
  });
}

function inline(s: string): string {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+)\)/g, `<a href="$2" style="color:${BRAND.teal};text-decoration:underline">$1</a>`)
    .replace(/\n/g, "<br>");
}

/** The body as HTML blocks (paragraphs and bullet lists). Placeholders must already be filled. */
export function bodyToHtml(body: string): string {
  return body
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split("\n");
      if (lines.every((l) => /^\s*-\s+/.test(l))) {
        const items = lines.map((l) => `<li style="margin:0 0 6px">${inline(l.replace(/^\s*-\s+/, ""))}</li>`).join("");
        return `<ul style="margin:0 0 16px;padding-left:20px;color:${BRAND.slate};font-size:16px;line-height:1.6">${items}</ul>`;
      }
      return `<p style="margin:0 0 16px;color:${BRAND.slate};font-size:16px;line-height:1.6">${inline(block)}</p>`;
    })
    .join("\n");
}

export function bodyToText(body: string): string {
  return body
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .trim();
}

/** A finished email: subject, HTML and text, with placeholders filled. */
export function renderEmail(tpl: TemplateContent, vars: Vars, lang: "en" | "fr" = "en") {
  // Values come from visitors or the system; editors' own text keeps its simple formatting.
  // Visitor values can never become links or bold text: brackets and ** are removed (no phishing through the contact form).
  const safeVars: Vars = Object.fromEntries(
    Object.entries(vars).map(([k, v]) => [k, v == null ? "" : k.endsWith("Url") ? String(v) : String(v).replace(/\*\*|[[\]]/g, "")]),
  );
  const subject = fill(tpl.subject, safeVars).replace(/\s+/g, " ").trim();
  const heading = tpl.heading ? fill(tpl.heading, safeVars) : "";
  const filledBody = fill(tpl.body, safeVars);
  const buttonUrl = tpl.buttonUrl ? fill(tpl.buttonUrl, safeVars) : "";
  const buttonLabel = tpl.buttonLabel ? fill(tpl.buttonLabel, safeVars) : "";
  const showButton = Boolean(buttonLabel && /^(https?:|mailto:)/.test(buttonUrl));
  const home = `${BRAND.site}/?lang=${lang}`;
  const footerLink = (text: string) => `<a href="${home}" style="color:${BRAND.slate}">${text}</a>`;
  const footer = `${footerLink(BRAND.name)} · Douala, Yaoundé, Bamenda, Buea & Limbe · ${footerLink("surfacelegend.com")}`;

  const html = `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Lato,Segoe UI,Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:28px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0">
<tr><td style="height:5px;background:linear-gradient(90deg,#1e3a5f,#14b8a6);background-color:${BRAND.teal}"></td></tr>
<tr><td style="padding:26px 32px 10px"><a href="${home}" style="text-decoration:none"><img src="${BRAND.site}/brand/mark-email.png" width="36" height="36" alt="" style="display:inline-block;vertical-align:middle;border:0;margin-right:10px"><span style="display:inline-block;vertical-align:middle;color:${BRAND.ink};font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700">Surface Legend</span></a></td></tr>
<tr><td style="padding:8px 32px 28px">
${heading ? `<h1 style="margin:0 0 18px;color:${BRAND.ink};font-size:24px;line-height:1.25">${esc(heading)}</h1>` : ""}
${bodyToHtml(filledBody)}
${showButton ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 6px"><tr><td style="border-radius:999px;background:${BRAND.teal}"><a href="${esc(buttonUrl)}" style="display:inline-block;padding:13px 26px;color:#ffffff;font-weight:700;font-size:16px;text-decoration:none;border-radius:999px">${esc(buttonLabel)}</a></td></tr></table>` : ""}
</td></tr>
<tr><td style="padding:18px 32px;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;line-height:1.5">${footer}</td></tr>
</table></td></tr></table></body></html>`;

  const text = [heading, bodyToText(filledBody), showButton ? `${buttonLabel}: ${buttonUrl}` : "", "", `${BRAND.name} · ${BRAND.site}`]
    .filter((l, i) => l || i > 1)
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { subject, html, text };
}
