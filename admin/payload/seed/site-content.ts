import type { Payload } from "payload";
import { PROJECTS_FR } from "./site-content-data";

/** The website's content as it was when the admin arrived, copied from src/locales and src/pages/Portfolio.tsx. */
const PROJECTS = [
  { category: "residential", image: "/assets/images/team/founder-action.jpg", en: ["Residential Interior Transformation", "Complete home interior refresh with elegant finishes"] },
  { category: "residential", image: "/images/HG8J7jg2cxvw.jpeg", en: ["Living Room & Bedroom Renovation", "Professional residential painting with premium finishes"] },
  { category: "commercial", image: "/images/mi2fprylqTsy.jpeg", en: ["Modern Office Space Design", "Contemporary commercial office with accent walls"] },
  { category: "commercial", image: "/images/KBNDOx9Y3Q0u.png", en: ["Corporate Office Transformation", "Professional business environment with brand colors"] },
  { category: "commercial", image: "/images/GaKZiu7nkgXl.jpg", en: ["Creative Office Entrance", "Bold entrance design with modern paint application"] },
  { category: "epoxy", image: "/images/ODyYXFbdux2b.jpg", en: ["Industrial Epoxy Floor Installation", "High-performance epoxy flooring for warehouse"] },
  { category: "epoxy", image: "/images/rmKjIQn4TZ3j.jpg", en: ["Warehouse Epoxy Flooring", "Seamless epoxy coating for industrial space"] },
] as const;

/** Fills the admin with what the website already shows, so nothing changes for visitors. Skips anything already there.
 * The site's three sample testimonials were placeholders, so they are not imported: real ones are added in the admin. */
export async function importSiteContent(payload: Payload) {
  const opts = { overrideAccess: true } as const;
  const report = { settings: false, projects: 0 };

  const current = await payload.findGlobal({ slug: "site-settings", depth: 0, ...opts });
  if (!current?.updatedAt) {
    await payload.updateGlobal({
      slug: "site-settings",
      data: { whatsapp: "237679235879", whatsapp2: "237692015866", email: "info@surfacelegend.com", quotesEmail: "quotes@surfacelegend.com" },
      ...opts,
    });
    report.settings = true;
  }

  if ((await payload.count({ collection: "projects", ...opts })).totalDocs === 0) {
    for (const [i, p] of PROJECTS.entries()) {
      const doc = await payload.create({
        collection: "projects",
        locale: "en",
        data: { title: p.en[0], description: p.en[1], category: p.category, staticImage: p.image, show: true, order: (i + 1) * 10 },
        ...opts,
      });
      const [title, description] = PROJECTS_FR[i];
      await payload.update({ collection: "projects", id: doc.id, locale: "fr", data: { title, description }, ...opts });
      report.projects++;
    }
  }

  return report;
}
