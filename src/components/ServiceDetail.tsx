import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useTranslation } from "react-i18next";

interface ServiceDetailProps {
  title: string;
  subtitle: string;
  overview: string;
  benefits: string[];
  processSteps: string[];
  whyChooseUs: string[];
  galleryImages?: string[];
}

export function ServiceDetail({
  title,
  subtitle,
  overview,
  benefits,
  processSteps,
  whyChooseUs,
  galleryImages = []
}: ServiceDetailProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="services" />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20 md:py-28">
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h1>
          <p className="text-xl text-gray-700 mb-12">{subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button className="bg-accent hover:bg-opacity-90 text-white px-8 py-3 font-semibold">
                {t('service_details_page.hero.cta_quote')}
              </Button>
            </a>
            <a href="https://wa.me/237679235879" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold shadow-sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('service_details_page.hero.cta_whatsapp')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SERVICE OVERVIEW */}
      <section className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-6 font-display">
            {t('service_details_page.overview.title')}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">{overview}</p>
        </div>
      </section>

      {/* KEY BENEFITS */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6 font-display">
              {t('service_details_page.benefits.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <p className="text-gray-700 font-medium">{benefit}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN EXPECT */}
      <section className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-12 font-display">
            {t('service_details_page.process.title')}
          </h2>

          <div className="space-y-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white font-semibold">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-700 text-lg">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SURFACE LEGEND */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6 font-display">
              {t('service_details_page.why_choose.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {whyChooseUs.map((reason, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CheckCircle2 className="w-8 h-8 text-accent mx-auto mb-4" />
                <p className="text-gray-700 font-medium">{reason}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="container py-20 md:py-28">
        <div className="text-center">
          <h2 className="mb-6 font-display">
            {t('service_details_page.recent_projects.title')}
          </h2>
          <p className="text-gray-700 text-lg mb-12 max-w-2xl mx-auto">
            {t('service_details_page.recent_projects.description')}
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {galleryImages.length > 0 ? (
              galleryImages.map((imgSrc, idx) => (
                <div key={idx} className="h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                  <img src={imgSrc} alt={`Project ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))
            ) : (
              [1, 2, 3].map((idx) => (
                <div key={idx} className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">{t('service_details_page.recent_projects.placeholder_image')} {idx}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container max-w-3xl mx-auto">
          <h2 className="mb-12 text-center font-display">
            {t('service_details_page.faq.title')}
          </h2>

          <div className="space-y-6">
            {[
              {
                q: t('service_details_page.faq.items.0.q'),
                a: t('service_details_page.faq.items.0.a')
              },
              {
                q: t('service_details_page.faq.items.1.q'),
                a: t('service_details_page.faq.items.1.a')
              },
              {
                q: t('service_details_page.faq.items.2.q'),
                a: t('service_details_page.faq.items.2.a')
              },
              {
                q: t('service_details_page.faq.items.3.q'),
                a: t('service_details_page.faq.items.3.a')
              }
            ].map((faq, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="font-semibold text-primary mb-3">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-primary text-white py-20 md:py-28">
        <div className="container text-center">
          <h2 className="mb-6 font-display text-white">
            {t('service_details_page.cta_bottom.title')}
          </h2>
          <p className="text-white/90 mb-12 max-w-2xl mx-auto text-lg">
            {t('service_details_page.cta_bottom.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a href="/contact">
              <Button className="bg-accent hover:bg-opacity-90 text-white px-8 py-3 font-semibold">
                {t('service_details_page.cta_bottom.btn_estimate')}
              </Button>
            </a>
            <a href="https://wa.me/237679235879" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold">
                {t('service_details_page.cta_bottom.btn_whatsapp')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
