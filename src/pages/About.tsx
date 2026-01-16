import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Lightbulb, Target, Heart, Palette, Briefcase, Award } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

/**
 * Surface Legend About Us Page
 * Design System: Craftsmanship Modernism
 * - Typography: Playfair Display (headers), Lato (body), Montserrat (accents)
 * - Colors: Deep Charcoal (#2C3E50), Warm Terracotta (#C85A3A), Soft Cream (#F5F1E8)
 * - Layout: Asymmetric, generous whitespace, restrained animations
 */

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${t('about.hero.title')} | ${t('general.title')}`}
        description={t('about.hero.intro_text')}
      />
      <Navigation currentPage="about" />

      {/* SECTION 1: HERO / INTRODUCTION */}
      <section className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-accent-label mb-4">{t('about.hero.subtitle')}</div>
          <h1 className="mb-6 font-display">
            {t('about.hero.title')}
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            {t('about.hero.intro_bold')}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('about.hero.intro_text')}
          </p>
        </div>
      </section>

      {/* CONTACT INFORMATION SECTION */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="mb-8 font-display">
            {t('about.story.title')}
          </h2>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              {t('about.story.p1')}
            </p>

            <p>
              {t('about.story.p2')}
            </p>

            <p className="font-semibold text-primary">
              {t('about.story.today_intro')}
            </p>

            <div className="space-y-4 pl-6 border-l-4 border-accent">
              <div>
                <h3 className="font-semibold text-primary mb-2">{t('about.story.services_title')}</h3>
                <p className="text-gray-600">{t('about.story.services_desc')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">{t('about.story.products_title')}</h3>
                <p className="text-gray-600">{t('about.story.products_desc')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">{t('about.story.academy_title')}</h3>
                <p className="text-gray-600">{t('about.story.academy_desc')}</p>
              </div>
            </div>

            <p>
              {t('about.story.growth')}
            </p>

            <p className="font-semibold text-accent text-lg">
              {t('about.story.conclusion')}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: MISSION, VISION & PROMISE */}
      <section className="container py-20 md:py-28">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 border-t-4 border-accent">
            <h3 className="text-xl font-semibold text-primary mb-4 font-display">
              {t('about.mission_vision.mission_title')}
            </h3>
            <p className="text-gray-700">
              {t('about.mission_vision.mission_text')}
            </p>
          </Card>

          <Card className="p-8 border-t-4 border-accent">
            <h3 className="text-xl font-semibold text-primary mb-4 font-display">
              {t('about.mission_vision.vision_title')}
            </h3>
            <p className="text-gray-700">
              {t('about.mission_vision.vision_text')}
            </p>
          </Card>

          <Card className="p-8 border-t-4 border-accent">
            <h3 className="text-xl font-semibold text-primary mb-4 font-display">
              {t('about.mission_vision.promise_title')}
            </h3>
            <p className="text-gray-700">
              {t('about.mission_vision.promise_text')}
            </p>
          </Card>
        </div>
      </section>

      {/* SECTION 4: BRAND ECOSYSTEM */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6 font-display">
              {t('about.divisions.title')}
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              {t('about.divisions.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Division 1: Services */}
            <Card className="p-8 service-card">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4 font-display">
                {t('about.divisions.services_title')}
              </h3>
              <p className="text-gray-600 mb-4 font-semibold">{t('about.divisions.services_subtitle')}</p>

              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                {[
                  "residential",
                  "industrial",
                  "pop",
                  "epoxy",
                  "waterproofing",
                  "panels",
                  "spray"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{t(`about.divisions.services_items.${item}`)}</span>
                  </li>
                ))}
              </ul>

              <p className="text-gray-700 italic text-sm">
                {t('about.divisions.services_note')}
              </p>
            </Card>

            {/* Division 2: Paint */}
            <Card className="p-8 service-card">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4 font-display">
                {t('about.divisions.products_title')}
              </h3>
              <p className="text-gray-600 mb-4 font-semibold">{t('about.divisions.products_subtitle')}</p>

              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                {[
                  "durability",
                  "application",
                  "coverage",
                  "weather",
                  "mold"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{t(`about.divisions.products_items.${item}`)}</span>
                  </li>
                ))}
              </ul>

              <p className="text-gray-700 italic text-sm">
                {t('about.divisions.products_note')}
              </p>
            </Card>

            {/* Division 3: Academy */}
            <Card className="p-8 service-card">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4 font-display">
                {t('about.divisions.academy_title')}
              </h3>
              <p className="text-gray-600 mb-4 font-semibold">{t('about.divisions.academy_subtitle')}</p>

              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                {[
                  "techniques",
                  "coatings",
                  "decorative",
                  "spray",
                  "epoxy",
                  "conduct"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{t(`about.divisions.academy_items.${item}`)}</span>
                  </li>
                ))}
              </ul>

              <p className="text-gray-700 italic text-sm">
                {t('about.divisions.academy_note')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHAT MAKES US UNIQUE */}
      <section className="container py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="mb-6 font-display">
            {t('about.unique.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            "premium",
            "tools",
            "clean",
            "trained",
            "nationwide",
            "legacy"
          ].map((key) => (
            <Card key={key} className="p-8 border-l-4 border-accent hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary mb-2">{t(`about.unique.items.${key}.title`)}</h3>
                  <p className="text-gray-700">{t(`about.unique.items.${key}.desc`)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 6: LEADERSHIP */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6 font-display">
              {t('about.leadership.title')}
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              {t('about.leadership.subtitle')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-accent shadow-lg">
                <img
                  src="/assets/images/team/founder.png"
                  alt={t('about.leadership.founder_name')}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-2 font-display">
                {t('about.leadership.founder_name')}
              </h3>
              <p className="text-accent font-semibold mb-4">{t('about.leadership.founder_role')}</p>
              <p className="text-gray-700 mb-6">
                {t('about.leadership.founder_desc')}
              </p>
              <div className="border-t border-muted pt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-primary">{t('about.contact_info.email')}:</span> info@surfacelegend.com
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-primary">{t('about.contact_info.phone')}:</span>{" "}
                  <a href="https://wa.me/237679235879" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                    679 235 879
                  </a>
                  {" | "}
                  <a href="https://wa.me/237692015866" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                    692 015 866
                  </a>
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="mb-6 font-display">{t('about.team.title', 'Our Dedicated Team')}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden shadow-lg h-96 relative group">
                <img src="/assets/images/team/team-pose.jpg" alt="Surface Legend Team" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg h-96 relative group">
                <img src="/assets/images/team/team-group.jpg" alt="Surface Legend Workers" className="w-full h-full object-cover object-[50%_20%] transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg h-96 relative group">
                <img src="/assets/images/team/founder-action.jpg" alt="Founder in Action" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CALL TO ACTION */}
      <section className="bg-primary text-white py-20 md:py-28">
        <div className="container text-center">
          <h2 className="mb-6 font-display text-white">
            {t('about.cta.title')}
          </h2>
          <p className="text-white/90 mb-12 max-w-2xl mx-auto text-lg">
            {t('about.cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a href="https://wa.me/237679235879" target="_blank" rel="noopener noreferrer">
              <Button className="bg-accent hover:bg-opacity-90 text-white px-8 py-3 font-semibold">
                {t('about.cta.whatsapp')}
              </Button>
            </a>
            <a href="/services">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold">
                {t('about.cta.services')}
              </Button>
            </a>
            <a href="https://wa.me/237679235879?text=Hello%20Surface%20Legend%2C%20I%20am%20interested%20in%20joining%20the%20Surface%20Legend%20Art%20Academy%20training%20program.%20Please%20provide%20more%20information%20about%20the%20training%20courses%20and%20enrollment%20process." target="_blank" rel="noopener noreferrer">
              <Button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 font-semibold">
                {t('about.cta.join')}
              </Button>
            </a>
          </div>
        </div>
      </section>
      < section className="bg-secondary py-16 md:py-20" >
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
      </section >

      <Footer />
    </div >
  );
}
