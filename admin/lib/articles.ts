/* eslint-disable @typescript-eslint/no-explicit-any */
const both = (v: any) => (v && typeof v === "object" ? { en: v.en ?? "", fr: v.fr ?? "" } : { en: v ?? "", fr: "" });
// Payload returns absolute URLs; the website is on the same address, so it uses them as paths.
const pathOf = (url: unknown) => String(url ?? "").replace(/^https?:\/\/[^/]+/, "");

/** An article as the website uses it, both languages together. */
export function articleJson(d: any, withBody: boolean) {
  return {
    slug: d.slug,
    category: d.category,
    publishedAt: d.publishedAt || d.createdAt,
    updatedAt: d.updatedAt,
    cover: pathOf(d.cover?.sizes?.wide?.url || d.cover?.url) || d.staticCover || "",
    title: both(d.title),
    excerpt: both(d.excerpt),
    ...(withBody ? { body: both(d.body) } : {}),
  };
}
