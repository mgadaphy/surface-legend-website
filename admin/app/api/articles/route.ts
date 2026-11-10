import { getPayload } from "payload";
import config from "@payload-config";
import { articleJson } from "@/lib/articles";

export const dynamic = "force-dynamic";

/** Published articles for the Blog page, newest first, without their full text. */
export async function GET() {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "articles",
      locale: "all",
      where: { published: { equals: true } },
      sort: "-publishedAt",
      limit: 200,
      depth: 1,
      pagination: false,
    });
    return Response.json({ articles: docs.map((d) => articleJson(d, false)) }, { headers: { "Cache-Control": "public, max-age=60" } });
  } catch (err) {
    console.error("[articles] could not read the blog", err);
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}
