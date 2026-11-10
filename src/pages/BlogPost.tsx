import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useArticle, useContact, formatDate } from "@/lib/content";
import { Markdown, readingMinutes } from "@/lib/markdown";
import { useTranslation } from "react-i18next";

/**
 * One blog article, read from /api/articles/<slug>.
 */
export default function BlogPost({ params }: { params: { slug: string } }) {
  const { t, i18n } = useTranslation();
  const article = useArticle(params.slug);
  const contact = useContact();

  if (article === undefined || article === null || article === "not-found") {
    const message = article === undefined ? t("blog_page.loading") : article === "not-found" ? t("blog_page.not_found") : t("blog_page.unavailable");
    return (
      <div className="min-h-screen bg-white">
        <SEO title={`${t("blog_page.hero.title")} | Surface Legend`} url={`/blog/${params.slug}`} />
        <Navigation currentPage="blog" />
        <section className="container py-32 text-center">
          <p className="text-gray-600 mb-6">{message}</p>
          <a href="/blog" className="text-accent-dark font-semibold underline">{t("blog_page.back")}</a>
        </section>
        <Footer />
      </div>
    );
  }

  const url = `https://surfacelegend.com/blog/${article.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.cover ? `https://surfacelegend.com${article.cover}` : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: i18n.language?.startsWith("fr") ? "fr" : "en",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Surface Legend", url: "https://surfacelegend.com" },
    publisher: { "@type": "Organization", name: "Surface Legend", logo: { "@type": "ImageObject", url: "https://surfacelegend.com/images/logo.png" } },
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO title={`${article.title} | Surface Legend`} description={article.excerpt} type="article" image={article.cover || undefined} url={`/blog/${article.slug}`} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Navigation currentPage="blog" />

      <article>
        <header className="bg-secondary pt-24 pb-12">
          <div className="container max-w-3xl">
            <a href="/blog" className="text-sm font-semibold text-accent-dark hover:text-primary">{t("blog_page.back")}</a>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600 mt-6 mb-3">
              <span className="font-semibold text-accent-dark">{t(`blog_page.categories.${article.category}`)}</span>
              <span>{formatDate(article.publishedAt, i18n.language)}</span>
              <span>{t("blog_page.minutes", { count: readingMinutes(article.body) })}</span>
            </div>
            <h1 className="mb-6 leading-tight">{article.title}</h1>
            <p className="text-xl text-gray-700 leading-relaxed">{article.excerpt}</p>
          </div>
        </header>

        {article.cover && (
          <div className="container max-w-4xl -mb-4 mt-10">
            <img src={article.cover} alt="" className="w-full max-h-[460px] object-cover rounded-2xl" />
          </div>
        )}

        <div className="container max-w-3xl py-14">
          <div className="article-body">
            <Markdown source={article.body} />
          </div>

          <aside className="mt-14 rounded-2xl bg-primary text-white p-8 md:p-10">
            <h2 className="text-2xl font-display text-white mb-3">{t("blog_page.cta.title")}</h2>
            <p className="text-white/85 mb-6">{t("blog_page.cta.text")}</p>
            <div className="flex flex-wrap gap-3">
              <a href="/contact"><Button className="btn-primary">{t("blog_page.cta.quote")}</Button></a>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="bg-transparent text-white border-white/60 hover:bg-white/10 hover:text-white">WhatsApp</Button>
              </a>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </div>
  );
}
