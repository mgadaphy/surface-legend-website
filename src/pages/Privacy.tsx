import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { formatDate } from "@/lib/content";
import { privacy, PRIVACY_UPDATED } from "@/content/privacy";
import { useTranslation } from "react-i18next";

/**
 * Privacy policy (English and French).
 */
export default function Privacy() {
  const { t, i18n } = useTranslation();
  const fr = i18n.language?.startsWith("fr");
  const pick = (l: { en: string; fr: string }) => (fr ? l.fr : l.en);

  return (
    <div className="min-h-screen bg-white">
      <SEO title={t("privacy_page.meta.title")} description={t("privacy_page.meta.description")} url="/privacy" />
      <Navigation currentPage="privacy" />

      <section className="bg-secondary pt-28 pb-14">
        <div className="container max-w-3xl">
          <h1 className="mb-4">{t("privacy_page.title")}</h1>
          <p className="text-gray-600">{t("privacy_page.updated", { date: formatDate(PRIVACY_UPDATED, i18n.language) })}</p>
        </div>
      </section>

      <section className="container max-w-3xl py-14">
        <div className="article-body">
          {privacy.map((s) => (
            <section key={s.heading.en}>
              <h2>{pick(s.heading)}</h2>
              {s.body.map((b, i) =>
                "list" in b ? (
                  <ul key={i}>{b.list.map((item) => <li key={item.en}>{pick(item)}</li>)}</ul>
                ) : (
                  <p key={i}>{pick(b)}</p>
                ),
              )}
            </section>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
