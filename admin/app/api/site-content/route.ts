import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

/* eslint-disable @typescript-eslint/no-explicit-any */
const both = (v: any) => (v && typeof v === "object" ? { en: v.en ?? "", fr: v.fr ?? "" } : { en: v ?? "", fr: "" });
// Payload returns absolute URLs; the website is on the same address, so it uses them as paths.
const pathOf = (url: unknown) => String(url ?? "").replace(/^https?:\/\/[^/]+/, "");

/**
 * What the static website reads when a page opens: contact details, testimonials and portfolio.
 * The website has the original content built in, and keeps using it if this fails.
 */
export async function GET() {
  try {
    const payload = await getPayload({ config });
    const [s, testimonials, projects] = await Promise.all([
      payload.findGlobal({ slug: "site-settings", depth: 0 }) as Promise<any>,
      payload.find({ collection: "testimonials", locale: "all", where: { show: { equals: true } }, sort: "order", limit: 100, depth: 0, pagination: false }),
      payload.find({ collection: "projects", locale: "all", where: { show: { equals: true } }, sort: "order", limit: 300, depth: 1, pagination: false }),
    ]);
    return Response.json(
      {
        contact: { whatsapp: s.whatsapp, whatsapp2: s.whatsapp2, email: s.email, quotesEmail: s.quotesEmail },
        testimonials: (testimonials.docs as any[]).map((t) => ({ id: t.id, name: t.name, role: both(t.role), quote: both(t.quote) })),
        projects: (projects.docs as any[]).map((p) => ({
          id: p.id,
          category: p.category,
          image: pathOf(p.image?.sizes?.card?.url || p.image?.url) || p.staticImage,
          title: both(p.title),
          description: both(p.description),
        })),
      },
      { headers: { "Cache-Control": "public, max-age=60" } },
    );
  } catch (err) {
    console.error("[site-content] could not read the admin's content", err);
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
