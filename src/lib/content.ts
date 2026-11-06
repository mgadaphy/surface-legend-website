import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Content managed in the admin (/admin), read once when the website opens.
 * The site keeps its built-in content until the answer arrives, and for good if the admin
 * cannot be reached, so a problem there never breaks a page.
 */
type Both = { en: string; fr: string };

export type SiteContent = {
  contact: { whatsapp: string; whatsapp2: string; email: string; quotesEmail: string };
  testimonials: { id: number; name: string; role: Both; quote: Both }[];
  projects: { id: number; category: string; image: string; title: Both; description: Both }[];
};

const DEFAULT_CONTACT: SiteContent["contact"] = {
  whatsapp: "237679235879",
  whatsapp2: "237692015866",
  email: "info@surfacelegend.com",
  quotesEmail: "quotes@surfacelegend.com",
};

let loaded: SiteContent | null = null;
let pending: Promise<SiteContent | null> | null = null;

function load() {
  pending ??= fetch("/api/site-content", { signal: AbortSignal.timeout(6000) })
    .then((res) => (res.ok ? (res.json() as Promise<SiteContent>) : null))
    .catch(() => null)
    .then((data) => (loaded = data));
  return pending;
}

function useSiteContent() {
  const [data, setData] = useState(loaded);
  useEffect(() => {
    if (!data) load().then(setData);
  }, [data]);
  return data;
}

/** 237679235879 becomes "679 235 879". */
const displayed = (digits: string) => digits.replace(/^237/, "").replace(/(\d{3})(?=\d)/g, "$1 ");

export function useContact() {
  const contact = useSiteContent()?.contact ?? DEFAULT_CONTACT;
  return { ...contact, whatsappDisplay: displayed(contact.whatsapp), whatsapp2Display: displayed(contact.whatsapp2) };
}

function usePick() {
  const { i18n } = useTranslation();
  const fr = i18n.language?.startsWith("fr");
  return (text: Both) => (fr ? text.fr || text.en : text.en || text.fr);
}

/** Testimonials in the visitor's language, or null while only the built-in ones are available. */
export function useTestimonials() {
  const data = useSiteContent();
  const pick = usePick();
  return data ? data.testimonials.map((t) => ({ text: pick(t.quote), name: t.name, role: pick(t.role) })) : null;
}

/** Portfolio projects in the visitor's language, or null while only the built-in ones are available. */
export function useProjects() {
  const data = useSiteContent();
  const pick = usePick();
  return data ? data.projects.map((p) => ({ id: String(p.id), category: p.category, image: p.image, title: pick(p.title), desc: pick(p.description) })) : null;
}
