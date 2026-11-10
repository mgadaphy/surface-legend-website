import { getPayload } from "payload";
import config from "@payload-config";
import { articleJson } from "@/lib/articles";

export const dynamic = "force-dynamic";

/** One published article with its full text. */
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "articles",
      locale: "all",
      where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] },
      limit: 1,
      depth: 1,
    });
    if (!docs[0]) return Response.json({ error: "not-found" }, { status: 404 });
    return Response.json({ article: articleJson(docs[0], true) }, { headers: { "Cache-Control": "public, max-age=60" } });
  } catch (err) {
    console.error("[articles] could not read an article", err);
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}
