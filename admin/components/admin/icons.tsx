import { ICONS, type Stroke } from "@/components/icon-paths";

const ring = (cx: number, cy: number, r: number) => `M${cx} ${cy - r}a${r} ${r} 0 1 0 0 ${2 * r}a${r} ${r} 0 1 0 0 ${-2 * r}Z`;

/** Admin-only drawings, in the same 48 x 48 line style as the website's icons. */
const ADMIN_ICONS = {
  home: [
    ["b", "M6 22 24 7l18 15"],
    ["b", "M11 19v22h26V19"],
    ["g", "M20 41V29h8v12"],
  ],
  inbox: [
    ["b", "M6 27 12 9h24l6 18v12H6z"],
    ["g", "M6 27h11l3 5h8l3-5h11"],
  ],
  quote: [
    ["b", "M6 10h36v24H22l-9 7v-7H6z"],
    ["g", "M16 20c0-2 1.5-3 3-3M16 20v4h4v-4h-4M26 20c0-2 1.5-3 3-3M26 20v4h4v-4h-4"],
  ],
  template: [
    ["b", "M5 11h38v26H5z"],
    ["b", "M5 11l19 15 19-15"],
    ["g", "M30 41l9-9 4 4-9 9h-4z"],
  ],
  building: [
    ["b", "M9 42V7h20v35"],
    ["b", "M29 18h10v24"],
    ["b", "M4 42h40"],
    ["g", "M15 14h2M21 14h2M15 21h2M21 21h2M15 28h2M21 28h2"],
    ["a", "M17 42v-6h4v6"],
  ],
  send: [
    ["b", "M43 5 5 21l15 6 6 16z"],
    ["g", "M43 5 20 27"],
  ],
  people: [
    ["b", ring(18, 16, 7)],
    ["b", "M5 41c0-8 6-13 13-13s13 5 13 13"],
    ["g", "M30 9.5a7 7 0 0 1 0 13M35 29c5 2 8 6 8 12"],
  ],
  globe: ICONS.globe,
  sun: [
    ["b", ring(24, 24, 8)],
    ["g", "M24 4v5M24 39v5M4 24h5M39 24h5M10 10l3.5 3.5M34.5 34.5 38 38M38 10l-3.5 3.5M13.5 34.5 10 38"],
  ],
  moon: [
    ["b", "M38 30A16 16 0 1 1 18 10a13 13 0 0 0 20 20z"],
    ["g", "M33 8v6M30 11h6"],
  ],
  pen: [
    ["b", "M8 40l3-11L32 8l8 8-21 21z"],
    ["g", "M27 13l8 8"],
  ],
  eye: [
    ["b", "M3 24s8-14 21-14 21 14 21 14-8 14-21 14S3 24 3 24z"],
    ["g", ring(24, 24, 6)],
  ],
  external: [
    ["b", "M20 10H8v30h30V28"],
    ["g", "M28 6h14v14M42 6 22 26"],
  ],
} satisfies Record<string, Stroke[]>;

export const ALL_ICONS = { ...ICONS, ...ADMIN_ICONS } as Record<string, Stroke[]>;
export type AdminIconName = keyof typeof ICONS | keyof typeof ADMIN_ICONS;

/** Which icon each admin menu entry shows (by Payload's nav link id). */
export const NAV_ICONS: Record<string, AdminIconName> = {
  "nav-articles": "pen",
  "nav-projects": "building",
  "nav-testimonials": "quote",
  "nav-media": "image",
  "nav-enquiries": "inbox",
  "nav-email-templates": "template",
  "nav-users": "user",
  "nav-global-site-settings": "building",
  "nav-global-email-settings": "send",
};

/** Static two-tone icon for the admin (the website's version animates). */
export function AdminIcon({ name, size = 20, className = "", label }: { name: AdminIconName; size?: number; className?: string; label?: string }) {
  const strokes = ALL_ICONS[name] ?? [];
  const gid = `slg-${name}`;
  return (
    <svg
      className={`sl-icon ${className}`}
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      strokeWidth={size < 28 ? 3.2 : 2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={gid} x1="44" y1="4" x2="4" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0.09" stopColor="var(--sl-navy-ink)" />
          <stop offset="0.8" stopColor="var(--sl-teal)" />
        </linearGradient>
      </defs>
      {strokes.map(([tone, d], i) => (
        <path key={i} d={d} stroke={tone === "b" ? "currentColor" : tone === "a" ? "var(--sl-teal)" : `url(#${gid})`} />
      ))}
    </svg>
  );
}

/** One-colour SVG of an icon as a data URI, for CSS masks (menu icons follow the text colour). */
export function iconMaskUri(name: AdminIconName) {
  const paths = (ALL_ICONS[name] ?? []).map(([, d]) => `<path d="${d}"/>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#000" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
