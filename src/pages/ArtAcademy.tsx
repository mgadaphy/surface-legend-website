import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, BookOpen, Users, Paintbrush, Award, Briefcase, CheckCircle2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

/**
 * Surface Legend Art Academy Page
 * Design System: Craftsmanship Modernism
 */

export default function ArtAcademy() {
  const { t } = useTranslation();

  const targetAudience = [
    { id: "beginners", icon: BookOpen },
    { id: "painters", icon: Paintbrush },
    { id: "decorative", icon: Award },
    { id: "contractors", icon: Users },
    { id: "creative", icon: GraduationCap }
  ];

  const programs = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  const whyTrain = ["0", "1", "2", "3", "4", "5"];

  const careerPaths = [
    { id: "join", icon: Briefcase },
    { id: "partner", icon: Users },
    { id: "independent", icon: Paintbrush },
    { id: "ambassador", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('academy_page.meta.title')}
        description={t('academy_page.meta.description')}
      />
      <Navigation currentPage="academy" />

      {/* HERO SECTION */}
      <section className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-accent-label mb-4">{t('academy_page.hero.label')}</div>
          <h1 className="mb-6">
            {t('academy_page.hero.title')}
            <span className="block text-2xl md:text-3xl text-accent font-semibold mt-4">
              {t('academy_page.hero.subtitle')}
            </span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {t('academy_page.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#programs">
              <Button className="btn-primary">
                {t('academy_page.hero.cta_programs')}
              </Button>
            </a>
            <a href="https://wa.me/237679235879?text=Hello%20Surface%20Legend%20Academy%2C%20I%20would%20like%20to%20enroll%20in%20your%20training%20programs." target="_blank" rel="noopener noreferrer">
              <Button className="border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white px-8 py-3 font-semibold">
                {t('academy_page.hero.cta_join')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* PURPOSE SECTION */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="mb-6">
            {t('academy_page.purpose.title')}
          </h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>{t('academy_page.purpose.p1')}</p>
            <p className="font-semibold text-primary">
              {t('academy_page.purpose.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE TRAIN */}
      <section className="container py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="mb-4">{t('academy_page.target.title')}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {targetAudience.map((item) => (
            <Card key={item.id} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                {t(`academy_page.target.items.${item.id}.title`)}
              </h3>
              <p className="text-gray-600 text-sm">
                {t(`academy_page.target.items.${item.id}.desc`)}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section id="programs" className="bg-primary text-white py-20 md:py-28">
        <div className="container max-w-4xl mx-auto">
          <h2 className="mb-12 text-center text-white">
            {t('academy_page.programs.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {programs.map((key) => (
              <div key={key} className="flex items-center gap-4 bg-white/10 p-4 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-white/90">{t(`academy_page.programs.items.${key}`)}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 text-white/70 italic">
            * {t('academy_page.programs.note')}
          </p>
        </div>
      </section>

      {/* WHY TRAIN WITH US */}
      <section className="container py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-12 text-center">{t('academy_page.why.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {whyTrain.map((key) => (
              <div key={key} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                <p className="text-lg text-gray-700">{t(`academy_page.why.items.${key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINING IN ACTION VIDEO */}
      <section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-6 font-display">
              {t('academy_page.video.title', 'See Training in Action')}
            </h2>
          </div>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <video
              controls
              className="w-full"
              poster="/assets/images/team/academy-workshop.png"
            >
              <source src="/assets/videos/parlour-painting.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* CAREER INTEGRATION */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container max-w-4xl mx-auto">
          <h2 className="mb-6 text-center">{t('academy_page.integration.title')}</h2>
          <p className="text-center text-gray-700 mb-12">
            {t('academy_page.integration.intro')}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {careerPaths.map((path) => (
              <Card key={path.id} className="p-6">
                <div className="flex items-start gap-4">
                  <path.icon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-2">
                      {t(`academy_page.integration.items.${path.id}.title`)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t(`academy_page.integration.items.${path.id}.desc`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-center text-lg font-semibold text-primary">
            {t('academy_page.integration.conclusion')}
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container py-20 md:py-28 text-center">
        <h2 className="mb-6 font-display">
          {t('academy_page.cta.title')}
        </h2>
        <p className="text-gray-700 mb-12 max-w-2xl mx-auto text-lg">
          {t('academy_page.cta.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/237679235879?text=Hello%20Surface%20Legend%20Academy%2C%20I%20would%20like%20to%20enroll." target="_blank" rel="noopener noreferrer">
            <Button className="btn-primary">
              {t('academy_page.cta.btn_enroll')}
            </Button>
          </a>
          <a href="/contact">
            <Button className="border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white px-8 py-3 font-semibold">
              {t('academy_page.cta.btn_contact')}
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div >
  );
}
