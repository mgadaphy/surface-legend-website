import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SCurveDivider } from "@/components/SCurveDivider";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

/**
 * Surface Legend Portfolio Page
 * Design System: Craftsmanship Modernism v2.0
 */

interface PortfolioProject {
  id: string;
  category: string;
  image: string;
  beforeAfter?: boolean;
}

const projects: PortfolioProject[] = [
  {
    id: "1",
    category: "residential",
    image: "/assets/images/team/founder-action.jpg"
  },
  {
    id: "2",
    category: "residential",
    image: "/images/HG8J7jg2cxvw.jpeg"
  },
  {
    id: "3",
    category: "commercial",
    image: "/images/mi2fprylqTsy.jpeg"
  },
  {
    id: "4",
    category: "commercial",
    image: "/images/KBNDOx9Y3Q0u.png"
  },
  {
    id: "5",
    category: "commercial",
    image: "/images/GaKZiu7nkgXl.jpg"
  },
  {
    id: "6",
    category: "epoxy",
    image: "/images/ODyYXFbdux2b.jpg"
  },
  {
    id: "7",
    category: "epoxy",
    image: "/images/rmKjIQn4TZ3j.jpg"
  }
];

export default function Portfolio() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const categories = [
    { id: "all", label: "all" },
    { id: "residential", label: "residential" },
    { id: "commercial", label: "commercial" },
    { id: "epoxy", label: "epoxy" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('portfolio_page.meta.title')}
        description={t('portfolio_page.meta.description')}
      />
      <Navigation currentPage="portfolio" />

      {/* HERO - Split Layout with S-Curve Division */}
      <section className="relative bg-primary overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left Side - Content */}
            <div className="flex flex-col justify-center py-16 md:py-24 lg:py-32 pr-0 lg:pr-12 relative z-10">
              <div className="text-accent-label mb-4 text-accent-light">{t('portfolio_page.hero.label')}</div>
              <h1 className="text-white mb-6 font-display">
                {t('portfolio_page.hero.title')}
              </h1>
              <p className="text-white/90 text-lg mb-6 font-semibold">
                {t('portfolio_page.hero.desc')}
              </p>
              <p className="text-white/80 text-base mb-8 max-w-xl leading-relaxed">
                {t('portfolio_page.hero.desc2')}
              </p>
            </div>

            {/* Right Side - Stunning Project Transformation */}
            <div className="relative h-[400px] lg:h-auto">
              <img
                src="/images/portfolio-hero-project.jpg"
                alt="Surface Legend transformation project showcase"
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
                  <linearGradient id="portfolio-scurve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1E3A5F" stopOpacity="1" />
                    <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,0 Q 40,200 50,400 T 100,800 L 0,800 Z"
                  fill="url(#portfolio-scurve-gradient)"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal S-Curve Divider */}
      <SCurveDivider variant="subtle" className="my-0" />

      {/* FILTER SECTION */}
      <section className="bg-secondary py-12">
        <div className="container">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Filter className="w-5 h-5 text-primary" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${activeFilter === cat.id
                  ? "bg-accent text-white"
                  : "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
                  }`}
              >
                {t(`portfolio_page.filters.${cat.label}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="container py-20 md:py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
            >
              <div className="relative overflow-hidden h-64 bg-gray-200">
                <img
                  src={project.image}
                  alt={t(`portfolio_page.projects.${project.id}.title`)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {project.beforeAfter && (
                  <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Before & After
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-sm text-accent font-semibold mb-2 uppercase">
                  {t(`portfolio_page.filters.${project.category === 'epoxy' ? 'epoxy' : project.category}`)}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{t(`portfolio_page.projects.${project.id}.title`)}</h3>
                <p className="text-gray-700 text-sm">{t(`portfolio_page.projects.${project.id}.desc`)}</p>
              </div>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        )}
      </section>

      {/* S-Curve Divider */}
      <SCurveDivider variant="default" className="my-0" />

      {/* STATS SECTION */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "150+", id: "projects" },
              { number: "98%", id: "satisfaction" },
              { number: "10+", id: "experience" },
              { number: "500+", id: "clients" }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-700 font-medium">{t(`portfolio_page.stats.${stat.id}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-primary text-white py-20 md:py-28">
        <div className="container text-center">
          <h2 className="mb-6 font-display text-white">
            {t('portfolio_page.cta.title')}
          </h2>
          <p className="text-white/90 mb-12 max-w-2xl mx-auto text-lg">
            {t('portfolio_page.cta.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a href="/contact">
              <Button className="bg-accent hover:bg-opacity-90 text-white px-8 py-3 font-semibold">
                {t('portfolio_page.cta.btn_quote')}
              </Button>
            </a>
            <a href="https://wa.me/237679235879" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold">
                {t('portfolio_page.cta.btn_whatsapp')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION SECTION - REUSED */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">{t('contact_page.info.phone')}</h3>
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
              <h3 className="font-semibold text-primary mb-2">{t('contact_page.info.hours.title')}</h3>
              <p className="text-gray-700">{t('contact_page.info.hours.mon_thu')}</p>
              <p className="text-gray-700">{t('contact_page.info.hours.fri')}</p>
              <p className="text-gray-700">{t('contact_page.info.hours.sat_sun')}</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">{t('contact_page.info.locations')}</h3>
              <p className="text-gray-700">Douala • Yaoundé • Bamenda • Buea & Limbe</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
