import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SCurveDivider } from "@/components/SCurveDivider";
import { useTranslation } from "react-i18next";

interface ServiceDetailProps {
  title: string;
  subtitle: string;
  overview: string;
  benefits: string[];
  processSteps: string[];
  whyChooseUs: string[];
  galleryImages?: string[];
  heroImage?: string; // NEW: Optional hero image for split-layout
}

export function ServiceDetail({
  title,
  subtitle,
  overview,
  benefits,
  processSteps,
  whyChooseUs,
  galleryImages = [],
  heroImage
}: ServiceDetailProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="services" />

      {/* HERO SECTION - Split Layout with S-Curve Division */}
      <section className="relative bg-primary overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[500px]">
            {/* Left Side - Content */}
            <div className="flex flex-col justify-center py-16 md:py-20 lg:py-24 pr-0 lg:pr-12 relative z-10">
              <h1 className="text-white mb-4 font-display">
                {title}
              </h1>
              <p className="text-white/90 text-lg mb-8 max-w-xl leading-relaxed">
                {subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact">
                  <Button className="btn-primary">
                    {t('service_details_page.hero.cta_quote')}
                  </Button>
                </a>
                <a href="https://wa.me/237679235879" target="_blank" rel="noopener noreferrer">
                  <Button className="btn-secondary text-white border-white hover:bg-white hover:text-primary">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t('service_details_page.hero.cta_whatsapp')}
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Side - Service Hero Image */}
            <div className="relative h-[350px] lg:h-auto">
              {heroImage ? (
                <>
                  <img
                    src={heroImage}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent"></div>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center">
                  <div className="text-center text-white/60 p-8">
                    <p className="text-sm">Service Image</p>
                  </div>
                </div>
              )}
            </div>

            {/* Vertical S-Curve Divider */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-24 -ml-12 pointer-events-none z-20">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 800"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="service-scurve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1E3A5F" stopOpacity="1" />
                    <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,0 Q 40,200 50,400 T 100,800 L 0,800 Z"
                  fill="url(#service-scurve-gradient)"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal S-Curve Divider */}
      <SCurveDivider variant="reverse" className="my-0" />

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
