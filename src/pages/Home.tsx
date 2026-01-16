import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Palette, Shield, MessageCircle, Briefcase, Award, Zap } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SCurveDivider } from "@/components/SCurveDivider";
import SEO from "@/components/SEO";

/**
 * Surface Legend Home Page
 * Design System: Craftsmanship Modernism
 * - Typography: Playfair Display (headers), Lato (body), Montserrat (accents)
 * - Colors: Deep Charcoal (#2C3E50), Warm Terracotta (#C85A3A), Soft Cream (#F5F1E8)
 * - Layout: Asymmetric, generous whitespace, restrained animations
 * - Mobile: Responsive hamburger menu for navigation
 */

import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Surface Legend - Home | Premium Painting & Coatings"
        description="Experience the perfect blend of craftsmanship, innovation, and artistry. Surface Legend elevates homes, businesses, and architectural spaces."
      />
      <Navigation currentPage="home" />

      {/* SECTION 1: HERO - Split Layout with S-Curve Division */}
      <section className="relative bg-primary overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[600px] md:min-h-[700px]">
            {/* Left Side - Content */}
            <div className="flex flex-col justify-center py-16 md:py-24 lg:py-32 pr-0 lg:pr-12 relative z-10">
              <div className="text-accent-label mb-4 text-accent-light">{t('home.hero_label')}</div>
              <h1 className="text-white mb-6 font-display">
                {t('home.hero_title')}
              </h1>
              <p className="text-white/90 text-lg mb-8 max-w-xl">
                {t('home.hero_subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/237679235879" target="_blank" rel="noopener noreferrer">
                  <Button className="btn-primary">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t('home.hero_cta_whatsapp')}
                  </Button>
                </a>
                <a href="/services">
                  <Button className="btn-secondary text-white border-white hover:bg-white hover:text-primary">
                    {t('home.hero_cta_services')}
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Side - Professional Painted Interior Image */}
            <div className="relative h-[400px] lg:h-auto">
              <img
                src="/images/hero-painted-interior.jpg"
                alt="Luxury interior with professional navy blue painted accent wall"
                className="w-full h-full object-cover"
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent"></div>
            </div>

            {/* Vertical S-Curve Divider - Logo-inspired smooth transition */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-24 -ml-12 pointer-events-none z-20">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 800"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="vertical-scurve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1E3A5F" stopOpacity="1" />
                    <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Smooth S-curve path */}
                <path
                  d="M 0,0 Q 40,200 50,400 T 100,800 L 0,800 Z"
                  fill="url(#vertical-scurve-gradient)"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* S-Curve Divider - Logo-inspired visual element */}
      <SCurveDivider variant="default" className="my-0" />

      {/* SECTION 2: WHO WE ARE */}
      <section className="container py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-accent-label mb-4">{t('home.who_we_are.label')}</div>
            <h2 className="mb-6 font-display">
              {t('home.who_we_are.title')}
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              {t('home.who_we_are.description')}
            </p>
            <p className="text-gray-700 text-lg font-semibold text-accent">
              {t('home.who_we_are.mission')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Palette className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-primary mb-2">{t('home.who_we_are.cards.services')}</h3>
              <p className="text-sm text-gray-600">{t('home.who_we_are.cards.services_desc')}</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Briefcase className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-primary mb-2">{t('home.who_we_are.cards.products')}</h3>
              <p className="text-sm text-gray-600">{t('home.who_we_are.cards.products_desc')}</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-primary mb-2">{t('home.who_we_are.cards.academy')}</h3>
              <p className="text-sm text-gray-600">{t('home.who_we_are.cards.academy_desc')}</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-primary mb-2">{t('home.who_we_are.cards.innovation')}</h3>
              <p className="text-sm text-gray-600">{t('home.who_we_are.cards.innovation_desc')}</p>
            </Card>
          </div>
        </div>
      </section >

      {/* SECTION 3: CORE SERVICES */}
      <section id="services" className="bg-secondary py-20 md:py-28" >
        <div className="container">
          <div className="text-center mb-16">
            <div className="text-center mb-16">
              <div className="text-accent-label mb-4">{t('home.services.label')}</div>
              <h2 className="mb-6 font-display">
                {t('home.services.title')}
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto text-lg">
                {t('home.services.description')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('home.services.items.residential'),
                description: t('home.services.items.residential_desc'),
                icon: "🏠"
              },
              {
                title: t('home.services.items.commercial'),
                description: t('home.services.items.commercial_desc'),
                icon: "🏢"
              },
              {
                title: t('home.services.items.industrial'),
                description: t('home.services.items.industrial_desc'),
                icon: "🏭"
              },
              {
                title: t('home.services.items.waterproofing'),
                description: t('home.services.items.waterproofing_desc'),
                icon: "💧"
              },
              {
                title: t('home.services.items.panels'),
                description: t('home.services.items.panels_desc'),
                icon: "✨"
              },
              {
                title: t('home.services.items.epoxy'),
                description: t('home.services.items.epoxy_desc'),
                icon: "🎨"
              }
            ].map((service, idx) => (
              <Card key={idx} className="service-card">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/services">
              <a href="/services">
                <Button className="btn-primary">{t('home.services.cta')}</Button>
              </a>
            </a>
          </div>
        </div>
      </section >

      {/* SECTION 4: PRODUCTS */}
      < section id="products" className="container py-20 md:py-28" >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/images/paint-products-showcase.jpg"
              alt="Surface Legend Paint Products"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <div className="text-accent-label mb-4">{t('home.products.label')}</div>
            <h2 className="mb-6 font-display">
              {t('home.products.title')}
            </h2>
            <p className="text-gray-700 mb-8 text-lg">
              {t('home.products.description')}
            </p>

            <div className="space-y-4 mb-8">
              {(t('home.products.benefits', { returnObjects: true }) as string[]).map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <a href="/products">
              <a href="/products">
                <Button className="btn-primary">{t('home.products.cta')}</Button>
              </a>
            </a>
          </div>
        </div>
      </section >

      {/* SECTION 5: ACADEMY */}
      < section id="academy" className="bg-secondary py-20 md:py-28" >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-accent-label mb-4">{t('home.academy.label')}</div>
              <h2 className="mb-6 font-display">
                {t('home.academy.title')}
              </h2>
              <p className="text-gray-700 mb-8 text-lg">
                {t('home.academy.description')}
              </p>

              <div className="mb-8">
                <h3 className="font-semibold text-primary mb-4">{t('home.academy.features_title')}</h3>
                <ul className="space-y-2 text-gray-700">
                  {(t('home.academy.features', { returnObjects: true }) as string[]).map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>

              <a href="https://wa.me/237679235879?text=Hello%20Surface%20Legend%2C%20I%20am%20interested%20in%20joining%20the%20Surface%20Legend%20Art%20Academy%20training%20program.%20Please%20provide%20more%20information%20about%20the%20training%20courses%20and%20enrollment%20process." target="_blank" rel="noopener noreferrer">
                <a href="https://wa.me/237679235879?text=Hello%20Surface%20Legend%2C%20I%20am%20interested%20in%20joining%20the%20Surface%20Legend%20Art%20Academy%20training%20program.%20Please%20provide%20more%20information%20about%20the%20training%20courses%20and%20enrollment%20process." target="_blank" rel="noopener noreferrer">
                  <Button className="btn-primary">{t('home.academy.cta')}</Button>
                </a>
              </a>
            </div>
            <div>
              <img
                src="/assets/images/team/team-pose.jpg"
                alt="Surface Legend Art Academy Team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section >

      {/* SECTION 6: WHY CHOOSE US */}
      < section className="container py-20 md:py-28" >
        <div className="text-center mb-16">
          <div className="text-accent-label mb-4">{t('home.why_us.label')}</div>
          <h2 className="mb-6 font-display">
            {t('home.why_us.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {(t('home.why_us.reasons', { returnObjects: true }) as string[]).map((reason, idx) => (
            <Card key={idx} className="p-8 text-center hover:shadow-lg transition-shadow">
              <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-4" />
              <p className="text-gray-700 font-semibold">{reason}</p>
            </Card>
          ))}
        </div>
      </section >

      {/* SECTION 7: PORTFOLIO PREVIEW */}
      < section className="bg-secondary py-20 md:py-28" >
        <div className="container">
          <div className="text-center mb-16">
            <div className="text-accent-label mb-4">{t('home.portfolio.label')}</div>
            <h2 className="mb-6 font-display">
              {t('home.portfolio.title')}
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              {t('home.portfolio.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/residential-painting-showcase.jpg"
                alt="Residential transformation"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/commercial-space-transformation.jpg"
                alt="Commercial space"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          <div className="text-center">
            <a href="/portfolio">
              <div className="text-center">
                <a href="/portfolio">
                  <Button className="btn-primary">{t('home.portfolio.cta')}</Button>
                </a>
              </div>
            </a>
          </div>
        </div>
      </section >

      {/* SECTION 8: TESTIMONIALS */}
      < section className="container py-20 md:py-28" >
        <div className="text-center mb-16">
          <div className="text-accent-label mb-4">{t('home.testimonials.label')}</div>
          <h2 className="mb-6 font-display">
            {t('home.testimonials.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {(t('home.testimonials.items', { returnObjects: true }) as any[]).map((testimonial, idx) => (
            <Card key={idx} className="p-8 border-l-4 border-accent">
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <p className="font-semibold text-primary">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
            </Card>
          ))}
        </div>
      </section >

      {/* SECTION 9: CONTACT & CTA */}
      < section id="contact" className="bg-primary text-white py-20 md:py-28" >
        <div className="container text-center">
          <h2 className="mb-6 font-display text-white">
            {t('home.cta.title')}
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            {t('home.cta.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="https://wa.me/237679235879" target="_blank" rel="noopener noreferrer">
              <Button className="bg-accent hover:bg-opacity-90 text-white px-8 py-3">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('home.cta.whatsapp')}
              </Button>
            </a>
            <a href="/contact">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold">
                {t('home.cta.quote')}
              </Button>
            </a>
          </div>

          <div className="border-t border-white/20 pt-8">
            <p className="text-white/80 mb-4">
              {t('home.cta.call')}:{" "}
              <a href="https://wa.me/237679235879" className="hover:text-accent transition-colors underline" target="_blank" rel="noopener noreferrer">
                679 235 879
              </a>
              {" | "}
              <a href="https://wa.me/237692015866" className="hover:text-accent transition-colors underline" target="_blank" rel="noopener noreferrer">
                692 015 866
              </a>
            </p>
            <p className="text-white/80">info@surfacelegend.com</p>
          </div>
        </div>
      </section >

      {/* CONTACT INFORMATION SECTION */}
      < section className="bg-secondary py-16 md:py-20" >
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">{t('home.contact_info.phone_label')}</h3>
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
              <h3 className="font-semibold text-primary mb-2">{t('home.contact_info.hours_label')}</h3>
              <p className="text-gray-700">{t('home.contact_info.hours_week')}</p>
              <p className="text-gray-700">{t('home.contact_info.hours_fri')}</p>
              <p className="text-gray-700">{t('home.contact_info.hours_weekend')}</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">{t('home.contact_info.locations_label')}</h3>
              <p className="text-gray-700">{t('home.contact_info.locations_list')}</p>
            </div>
          </div>
        </div>
      </section >

      <Footer />
    </div >
  );
}
