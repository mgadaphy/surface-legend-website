import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://surfacelegend.com").replace(/\/$/, "");

/** Every page of the website, kept in step with src/App.tsx, plus the published articles. */
const PAGES = [
  "/",
  "/about",
  "/services",
  "/products",
  "/academy",
  "/portfolio",
  "/blog",
  "/contact",
  "/privacy",
  ...[
    "residential-painting",
    "commercial-painting",
    "interior-painting",
    "exterior-painting",
    "metal-painting",
    "roof-painting",
    "waterproofing",
    "epoxy-floor-coating",
    "pop-decorative-finishes",
    "steel-structure-painting",
    "mold-resistant-coatings",
    "highrise-building-painting",
    "protective-industrial-coatings",
  ].map((s) => `/services/${s}`),
];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

export async function GET() {
  let articles: { slug: string; updatedAt: string }[] = [];
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({ collection: "articles", where: { published: { equals: true } }, limit: 1000, depth: 0, pagination: false, select: { slug: true, updatedAt: true } });
    articles = docs.map((d) => ({ slug: String(d.slug), updatedAt: String(d.updatedAt) }));
  } catch (err) {
    console.error("[sitemap] articles unavailable, listing the pages only", err);
  }
  const urls = [
    ...PAGES.map((p) => `<url><loc>${SITE}${p === "/" ? "" : p}</loc></url>`),
    ...articles.map((a) => `<url><loc>${SITE}/blog/${esc(a.slug)}</loc><lastmod>${a.updatedAt.slice(0, 10)}</lastmod></url>`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=600" } });
}
