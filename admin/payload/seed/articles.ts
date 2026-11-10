import type { Payload } from "payload";
import { ARTICLES } from "./articles-data";

/** Imports the first six articles into the Blog, published. Skips any address that already exists. */
export async function importArticles(payload: Payload) {
  let created = 0;
  for (const a of ARTICLES) {
    const existing = await payload.count({ collection: "articles", where: { slug: { equals: a.slug } }, overrideAccess: true });
    if (existing.totalDocs) continue;
    const doc = await payload.create({
      collection: "articles",
      locale: "en",
      data: { slug: a.slug, category: a.category as never, staticCover: a.cover, publishedAt: a.publishedAt, published: true, ...a.en },
      overrideAccess: true,
    });
    await payload.update({ collection: "articles", id: doc.id, locale: "fr", data: { ...a.fr }, overrideAccess: true });
    created++;
  }
  return created;
}
