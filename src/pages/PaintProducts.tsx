import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Palette, Shield, Droplets, Brush, Factory, Sparkles, Wrench, MessageCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

/**
 * Surface Legend Paint Products Page
 * Design System: Craftsmanship Modernism
 */

export default function PaintProducts() {
  const { t } = useTranslation();

  const categories = [
    { id: "interior", icon: Palette },
    { id: "exterior", icon: Shield },
    { id: "industrial", icon: Factory },
    { id: "decorative", icon: Sparkles },
    { id: "protective", icon: Wrench },
    { id: "wood", icon: Brush },
    { id: "epoxy", icon: Droplets }
  ];

  const whyUs = ["0", "1", "2", "3", "4", "5", "6"];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('products_page.meta.title')}
        description={t('products_page.meta.description')}
      />
      <Navigation currentPage="products" />

      {/* SECTION 1: HERO */}
      <section className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-accent-label mb-4">{t('products_page.hero.label')}</div>
          <h1 className="mb-6">
            {t('products_page.hero.title')}
          </h1>
          <p className="text-xl text-accent font-semibold mb-6">
            {t('products_page.hero.subtitle')}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {t('products_page.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#product-categories">
              <Button className="btn-primary">
                {t('products_page.hero.cta_categories')}
              </Button>
            </a>
            <a href="https://wa.me/237679235879?text=Hello%20Surface%20Legend%2C%20I%20would%20like%20to%20request%20more%20information%20about%20your%20paint%20products%20and%20pricing." target="_blank" rel="noopener noreferrer">
              <Button className="border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white px-8 py-3 font-semibold">
                {t('products_page.hero.cta_info')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR PRODUCT PHILOSOPHY */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container max-w-3xl mx-auto">
          <h2 className="mb-6 text-center">
            {t('products_page.philosophy.title')}
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>{t('products_page.philosophy.p1')}</p>
            <p>{t('products_page.philosophy.p2')}</p>
            <p className="font-semibold text-primary">
              {t('products_page.philosophy.p3')}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCT CATEGORIES */}
      <section id="product-categories" className="container py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            {t('products_page.categories.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Card key={cat.id} className="p-6 service-card text-center">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <cat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t(`products_page.categories.items.${cat.id}.title`)}
              </h3>
              <p className="text-gray-700 text-sm">{t(`products_page.categories.items.${cat.id}.desc`)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 4: WHY SURFACE LEGEND PAINT */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container max-w-4xl mx-auto">
          <h2 className="mb-8 text-center">
            {t('products_page.why.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {whyUs.map((key) => (
              <div key={key} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-lg">{t(`products_page.why.items.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: INTEGRATED BRAND ADVANTAGE */}
      <section className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-6 text-center">
            {t('products_page.ecosystem.title')}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {t('products_page.ecosystem.intro')}
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary mb-1">{t('products_page.ecosystem.items.manufactured.title')}</h3>
                <p className="text-gray-700">{t('products_page.ecosystem.items.manufactured.desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary mb-1">{t('products_page.ecosystem.items.applied.title')}</h3>
                <p className="text-gray-700">{t('products_page.ecosystem.items.applied.desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary mb-1">{t('products_page.ecosystem.items.taught.title')}</h3>
                <p className="text-gray-700">{t('products_page.ecosystem.items.taught.desc')}</p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg font-semibold text-center text-primary">
            {t('products_page.ecosystem.conclusion')}
          </p>
        </div>
      </section>

      {/* SECTION 6: CALL TO ACTION */}
      <section className="bg-primary text-white py-20 md:py-28">
        <div className="container text-center">
          <h2 className="mb-6 font-display text-white">
            {t('products_page.cta.title')}
          </h2>
          <p className="text-white/90 mb-12 max-w-2xl mx-auto text-lg">
            {t('products_page.cta.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a href="/contact">
              <Button className="bg-accent hover:bg-opacity-90 text-white px-8 py-3 font-semibold">
                {t('products_page.cta.btn_contact')}
              </Button>
            </a>
            <a href="https://wa.me/237679235879?text=Hello%20Surface%20Legend%2C%20I%20would%20like%20to%20inquire%20about%20your%20paint%20products." target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                {t('products_page.cta.btn_whatsapp')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

