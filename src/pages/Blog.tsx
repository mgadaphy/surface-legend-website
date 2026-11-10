import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { useArticles, formatDate } from "@/lib/content";
import { useTranslation } from "react-i18next";

/**
 * Surface Legend Blog
 * Articles are written in the admin (/admin, Blog) and read from /api/articles.
 */
export default function Blog() {
  const { t, i18n } = useTranslation();
  const articles = useArticles();

  return (
    <div className="min-h-screen bg-white">
      <SEO title={t("blog_page.meta.title")} description={t("blog_page.meta.description")} url="/blog" />
      <Navigation currentPage="blog" />

      <section className="bg-secondary pt-28 pb-16">
        <div className="container text-center max-w-3xl">
          <div className="text-accent-label mb-4">{t("blog_page.hero.label")}</div>
          <h1 className="mb-6">{t("blog_page.hero.title")}</h1>
          <p className="text-xl text-gray-700 leading-relaxed">{t("blog_page.hero.subtitle")}</p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        {articles === undefined ? (
          <p className="text-center text-gray-500">{t("blog_page.loading")}</p>
        ) : articles === null || articles.length === 0 ? (
          <p className="text-center text-gray-500">{articles === null ? t("blog_page.unavailable") : t("blog_page.empty")}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a) => (
              <a key={a.slug} href={`/blog/${a.slug}`} className="group block">
                <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow">
                  <div className="relative overflow-hidden h-56 bg-gray-200">
                    {a.cover && <img src={a.cover} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-accent-dark font-semibold mb-2">
                      {t(`blog_page.categories.${a.category}`)}<span className="ml-3 text-gray-500 font-normal">{formatDate(a.publishedAt, i18n.language)}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-primary mb-3 leading-snug">{a.title}</h2>
                    <p className="text-gray-700 text-sm leading-relaxed">{a.excerpt}</p>
                    <span className="inline-block mt-4 text-sm font-semibold text-accent-dark group-hover:text-primary">{t("blog_page.read")}</span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
