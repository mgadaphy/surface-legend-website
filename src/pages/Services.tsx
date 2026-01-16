import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Palette, Shield, Wrench } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { SCurveDivider } from "@/components/SCurveDivider";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

/**
 * Surface Legend Services Page
 * Design System: Craftsmanship Modernism v2.0
 * - Typography: Playfair Display (headers), Lato (body), Montserrat (accents)
 * - Colors: Surface Navy (#1E3A5F), Legend Teal (#14B8A6)
 * - Layout: Split-layout heroes, S-curve dividers, generous whitespace
 */

export default function Services() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${t('services_page.hero.title')} | ${t('general.title')}`}
        description={t('services_page.hero.description')}
      />
      <Navigation currentPage="services" />

      {/* SECTION 1: HERO - Split Layout with S-Curve Division */}
      <section className="relative bg-primary overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left Side - Content */}
            <div className="flex flex-col justify-center py-16 md:py-24 lg:py-32 pr-0 lg:pr-12 relative z-10">
              <div className="text-accent-label mb-4 text-accent-light">{t('services_page.hero.label')}</div>
              <h1 className="text-white mb-6 font-display">
                {t('services_page.hero.title')}
              </h1>
              <p className="text-white/90 text-lg mb-6 font-semibold">
                {t('services_page.hero.subtitle')}
              </p>
              <p className="text-white/80 text-base mb-8 max-w-xl leading-relaxed">
                {t('services_page.hero.description')}
              </p>
            </div>

            {/* Right Side - Premium Paint Products */}
            <div className="relative h-[400px] lg:h-auto">
              <img
                src="/images/paint-products-showcase.jpg"
                alt="Premium Surface Legend paint products"
                className="w-full h-full object-cover"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent"></div>
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
                  <linearGradient id="services-scurve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1E3A5F" stopOpacity="1" />
                    <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,0 Q 40,200 50,400 T 100,800 L 0,800 Z"
                  fill="url(#services-scurve-gradient)"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal S-Curve Divider */}
      <SCurveDivider variant="default" className="my-0" />

      {/* SECTION 2: SERVICE OVERVIEW */}
      <section id="service-details" className="bg-secondary py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">
              {t('services_page.overview.title')}
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              {t('services_page.overview.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wrench className="w-8 h-8 text-accent" />,
                title: t('services_page.overview.cards.painting.title'),
                description: t('services_page.overview.cards.painting.desc')
              },
              {
                icon: <Palette className="w-8 h-8 text-accent" />,
                title: t('services_page.overview.cards.decorative.title'),
                description: t('services_page.overview.cards.decorative.desc')
              },
              {
                icon: <Shield className="w-8 h-8 text-accent" />,
                title: t('services_page.overview.cards.industrial.title'),
                description: t('services_page.overview.cards.industrial.desc')
              }
            ].map((category, idx) => (
              <Card key={idx} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-3">{category.title}</h3>
                <p className="text-gray-700">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PAINTING SOLUTIONS */}
      <section className="container py-20 md:py-28">
        <h2 className="mb-4">
          {t('services_page.painting.title')}
        </h2>
        <p className="text-gray-700 text-lg mb-12 max-w-3xl">
          {t('services_page.painting.description')}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: t('services_page.painting.items.residential.title'),
              description: t('services_page.painting.items.residential.desc'),
              link: "/services/residential-painting"
            },
            {
              title: t('services_page.painting.items.commercial.title'),
              description: t('services_page.painting.items.commercial.desc'),
              link: "/services/commercial-painting"
            },
            {
              title: t('services_page.painting.items.interior.title'),
              description: t('services_page.painting.items.interior.desc'),
              link: "/services/interior-painting"
            },
            {
              title: t('services_page.painting.items.exterior.title'),
              description: t('services_page.painting.items.exterior.desc'),
              link: "/services/exterior-painting"
            },
            {
              title: t('services_page.painting.items.metal.title'),
              description: t('services_page.painting.items.metal.desc'),
              link: "/services/metal-painting"
            },
            {
              title: t('services_page.painting.items.roof.title'),
              description: t('services_page.painting.items.roof.desc'),
              link: "/services/roof-painting"
            },
            {
              title: t('services_page.painting.items.waterproofing.title'),
              description: t('services_page.painting.items.waterproofing.desc'),
              link: "/services/waterproofing"
            }
          ].map((service, idx) => (
            <a key={idx} href={service.link || "#"} className="block">
              <Card className="p-8 border-l-4 border-accent hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-semibold text-primary">{service.title}</h3>
                </div>
                <p className="text-gray-700">{service.description}</p>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 4: DECORATIVE & SPECIALIZED FINISHES */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container">
          <h2 className="mb-4">
            {t('services_page.decorative.title')}
          </h2>
          <p className="text-gray-700 text-lg mb-12 max-w-3xl">
            {t('services_page.decorative.description')}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: t('services_page.decorative.items.pop.title'),
                description: t('services_page.decorative.items.pop.desc'),
                link: "/services/pop-decorative-finishes"
              },
              {
                title: t('services_page.decorative.items.texture.title'),
                description: t('services_page.decorative.items.texture.desc'),
                link: "/services/pop-decorative-finishes"
              },
              {
                title: t('services_page.decorative.items.panels.title'),
                description: t('services_page.decorative.items.panels.desc'),
                link: "/services/pop-decorative-finishes"
              },
              {
                title: t('services_page.decorative.items.wallpaper.title'),
                description: t('services_page.decorative.items.wallpaper.desc'),
                link: "#"
              },
              {
                title: t('services_page.decorative.items.furniture.title'),
                description: t('services_page.decorative.items.furniture.desc'),
                link: "#"
              },
              {
                title: t('services_page.decorative.items.artistic.title'),
                description: t('services_page.decorative.items.artistic.desc'),
                link: "/services/pop-decorative-finishes"
              }
            ].map((service, idx) => (
              <a key={idx} href={service.link || "#"} className="block">
                <Card className="p-8 border-l-4 border-accent hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <Palette className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <h3 className="text-lg font-semibold text-primary">{service.title}</h3>
                  </div>
                  <p className="text-gray-700">{service.description}</p>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: INDUSTRIAL & PROTECTIVE COATINGS */}
      <section className="container py-20 md:py-28">
        <h2 className="mb-4">
          {t('services_page.industrial.title')}
        </h2>
        <p className="text-gray-700 text-lg mb-12 max-w-3xl">
          {t('services_page.industrial.description')}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: t('services_page.industrial.items.epoxy.title'),
              description: t('services_page.industrial.items.epoxy.desc'),
              link: "/services/epoxy-floor-coating"
            },
            {
              title: t('services_page.industrial.items.steel.title'),
              description: t('services_page.industrial.items.steel.desc'),
              link: "/services/steel-structure-painting"
            },
            {
              title: t('services_page.industrial.items.mold.title'),
              description: t('services_page.industrial.items.mold.desc'),
              link: "/services/mold-resistant-coatings"
            },
            {
              title: t('services_page.industrial.items.highrise.title'),
              description: t('services_page.industrial.items.highrise.desc'),
              link: "/services/highrise-building-painting"
            },
            {
              title: t('services_page.industrial.items.protective.title'),
              description: t('services_page.industrial.items.protective.desc'),
              link: "/services/protective-industrial-coatings"
            }
          ].map((service, idx) => (
            <a key={idx} href={service.link || "#"} className="block">
              <Card className="p-8 border-l-4 border-accent hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-semibold text-primary">{service.title}</h3>
                </div>
                <p className="text-gray-700">{service.description}</p>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 6: WHY CHOOSE US */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">
              {t('services_page.why_choose.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('services_page.why_choose.items.materials.title'),
                description: t('services_page.why_choose.items.materials.desc')
              },
              {
                title: t('services_page.why_choose.items.team.title'),
                description: t('services_page.why_choose.items.team.desc')
              },
              {
                title: t('services_page.why_choose.items.tools.title'),
                description: t('services_page.why_choose.items.tools.desc')
              },
              {
                title: t('services_page.why_choose.items.safety.title'),
                description: t('services_page.why_choose.items.safety.desc')
              },
              {
                title: t('services_page.why_choose.items.transparent.title'),
                description: t('services_page.why_choose.items.transparent.desc')
              },
              {
                title: t('services_page.why_choose.items.nationwide.title'),
                description: t('services_page.why_choose.items.nationwide.desc')
              }
            ].map((reason, idx) => (
              <Card key={idx} className="p-8 text-center hover:shadow-lg transition-shadow">
                <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-primary mb-2">{reason.title}</h3>
                <p className="text-gray-700 text-sm">{reason.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section id="contact" className="bg-primary text-white py-20 md:py-28">
        <div className="container text-center">
          <h2 className="mb-6 font-display text-white">
            {t('services_page.cta.title')}
          </h2>
          <p className="text-white/90 mb-12 max-w-2xl mx-auto text-lg">
            {t('services_page.cta.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a href="#service-details" onClick={(e) => {
              e.preventDefault();
              const serviceSection = document.getElementById('service-details');
              if (serviceSection) {
                serviceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}>
              <Button className="bg-accent hover:bg-opacity-90 text-white px-8 py-3 font-semibold">
                {t('services_page.cta.view_details')}
              </Button>
            </a>
            <a href="https://wa.me/237679235879" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold">
                {t('services_page.cta.whatsapp')}
              </Button>
            </a>
            <a href="/contact">
              <Button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 font-semibold">
                {t('services_page.cta.quote')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION SECTION */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">{t('about.contact_info.phone')}</h3>
              <p className="text-gray-700">
                <a href="https://wa.me/237679235879" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                  679 235 879
                </a>
              </p>
              <p className="text-gray-700">
                <a href="https://wa.me/237692015866" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                  692 015 866
                </a>
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">{t('about.contact_info.business_hours')}</h3>
              <p className="text-gray-700">{t('about.contact_info.mon_thu')}</p>
              <p className="text-gray-700">{t('about.contact_info.fri')}</p>
              <p className="text-gray-700">{t('about.contact_info.sat_sun')}</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">{t('about.contact_info.locations')}</h3>
              <p className="text-gray-700">{t('about.contact_info.locations_list')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary/95 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">
                {t('general.title')}</h3>
              <p className="text-white/70 text-sm">{t('footer.tagline')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="https://wa.me/237679235879" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    679 235 879
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/237692015866" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    692 015 866
                  </a>
                </li>
                <li>info@surfacelegend.com</li>
                <li><a href="/contact" className="hover:text-white transition-colors">{t('services_page.cta.quote')}</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.locations')}</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Douala</li>
                <li>Yaoundé</li>
                <li>Bamenda</li>
                <li>Buea & Limbe</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.follow_us')}</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/70 text-sm">
            <p>&copy; 2025 {t('general.title')}. {t('footer.rights')} | {t('footer.tagline')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
