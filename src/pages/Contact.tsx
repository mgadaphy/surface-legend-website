import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

/**
 * Surface Legend Contact Page
 * Design System: Craftsmanship Modernism
 */

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "services",
    specificInterest: "residential",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare WhatsApp Message
    const text =
      `*New Inquiry from Website Contact Form*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Type:* ${formData.type}%0A` +
      `*Detail:* ${formData.specificInterest}%0A` +
      `*Message:* ${formData.message}`;

    // Simulate slight delay for UX
    setTimeout(() => {
      window.open(`https://wa.me/237679235879?text=${text}`, '_blank');
      setIsSubmitting(false);
    }, 1000);
  };

  const locations = [
    { id: "douala" },
    { id: "yaounde" },
    { id: "bamenda" },
    { id: "buea" } // Handles Buea & Limbe
  ];

  const faqs = ["0", "1", "2", "3", "4", "5"];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('contact_page.meta.title')}
        description={t('contact_page.meta.description')}
      />
      <Navigation currentPage="contact" />

      {/* HERO SECTION */}
      <section className="bg-secondary pt-28 pb-16">
        <div className="container text-center max-w-3xl">
          <div className="text-accent-label mb-4">{t('contact_page.hero.label')}</div>
          <h1 className="mb-6">{t('contact_page.hero.title')}</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            {t('contact_page.hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

          {/* CONTACT INFO SIDE */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-display mb-6">{t('contact_page.info.title')}</h2>
              <div className="space-y-6">
                <Card className="p-6 flex items-start gap-4">
                  <Phone className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{t('contact_page.info.phone')}</h3>
                    <p className="text-gray-700 font-medium">
                      <a href="https://wa.me/237679235879" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">679 235 879</a>
                    </p>
                    <p className="text-gray-700 font-medium">
                      <a href="https://wa.me/237692015866" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">692 015 866</a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{t('contact_page.info.cta_whatsapp')}</p>
                  </div>
                </Card>

                <Card className="p-6 flex items-start gap-4">
                  <Mail className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{t('contact_page.info.email')}</h3>
                    <p className="text-gray-700">info@surfacelegend.com</p>
                    <p className="text-gray-700">quotes@surfacelegend.com</p>
                  </div>
                </Card>

                <Card className="p-6 flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{t('contact_page.info.locations')}</h3>
                    <p className="text-gray-700">Douala</p>
                    <p className="text-gray-700">Yaoundé</p>
                    <p className="text-gray-700">Bamenda</p>
                    <p className="text-gray-700">Buea & Limbe</p>
                  </div>
                </Card>

                <Card className="p-6 flex items-start gap-4">
                  <Clock className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{t('contact_page.info.hours.title')}</h3>
                    <p className="text-gray-700">{t('contact_page.info.hours.mon_thu')}</p>
                    <p className="text-gray-700">{t('contact_page.info.hours.fri')}</p>
                    <p className="text-gray-700">{t('contact_page.info.hours.sat_sun')}</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* CONTACT FORM SIDE */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-display mb-2">{t('contact_page.form.title')}</h2>
            <p className="text-gray-600 mb-8 text-sm">
              {t('contact_page.form.disclaimer')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">{t('contact_page.form.name_label')}</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t('contact_page.form.name_placeholder')}
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">{t('contact_page.form.email_label')}</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('contact_page.form.email_placeholder')}
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">{t('contact_page.form.phone_label')}</label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t('contact_page.form.phone_placeholder')}
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('contact_page.form.type_label')}</label>
                <Select onValueChange={(val) => handleSelectChange(val, 'type')} defaultValue="services" required>
                  <SelectTrigger>
                    <SelectValue placeholder={t('contact_page.form.type_placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="services">{t('contact_page.inquiry_types.services')}</SelectItem>
                    <SelectItem value="products">{t('contact_page.inquiry_types.products')}</SelectItem>
                    <SelectItem value="academy">{t('contact_page.inquiry_types.academy')}</SelectItem>
                    <SelectItem value="general">{t('contact_page.inquiry_types.general')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.type === 'services' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <label className="text-sm font-medium text-gray-700">{t('contact_page.form.service_label')}</label>
                  <Select onValueChange={(val) => handleSelectChange(val, 'specificInterest')} defaultValue="residential">
                    <SelectTrigger>
                      <SelectValue placeholder={t('contact_page.form.service_placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">{t('services_page.painting.items.residential.title')}</SelectItem>
                      <SelectItem value="commercial">{t('services_page.painting.items.commercial.title')}</SelectItem>
                      <SelectItem value="interior">{t('service_details.interior.title')}</SelectItem>
                      <SelectItem value="exterior">{t('service_details.exterior.title')}</SelectItem>
                      <SelectItem value="roof">{t('service_details.roof.title')}</SelectItem>
                      <SelectItem value="metal">{t('service_details.metal.title')}</SelectItem>
                      <SelectItem value="waterproofing">{t('service_details.waterproofing.title')}</SelectItem>
                      <SelectItem value="epoxy">{t('services_page.industrial.items.epoxy.title')}</SelectItem>
                      <SelectItem value="decorative">{t('services_page.decorative.title')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.type === 'products' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <label className="text-sm font-medium text-gray-700">{t('contact_page.form.product_label')}</label>
                  <Select onValueChange={(val) => handleSelectChange(val, 'specificInterest')}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('contact_page.form.product_placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interior">Interior Paint</SelectItem>
                      <SelectItem value="exterior">Exterior Paint</SelectItem>
                      <SelectItem value="epoxy">Epoxy Coatings</SelectItem>
                      <SelectItem value="decorative">Decorative Paint</SelectItem>
                      <SelectItem value="bulk">Bulk Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.type === 'academy' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <label className="text-sm font-medium text-gray-700">{t('contact_page.form.program_label')}</label>
                  <Select onValueChange={(val) => handleSelectChange(val, 'specificInterest')}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('contact_page.form.program_placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner Training</SelectItem>
                      <SelectItem value="professional">Professional Upskilling</SelectItem>
                      <SelectItem value="decorative">Decorative Arts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">{t('contact_page.form.message_label')}</label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('contact_page.form.message_placeholder')}
                  className="min-h-[120px]"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full btn-primary py-6 text-lg" disabled={isSubmitting}>
                {isSubmitting ? t('contact_page.form.sending') : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    {t('contact_page.form.btn_send')}
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="bg-secondary py-20">
        <div className="container text-center max-w-4xl">
          <h2 className="mb-6">{t('contact_page.areas.title')}</h2>
          <p className="text-gray-700 mb-12">
            {t('contact_page.areas.desc')}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((loc) => (
              <div key={loc.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <MapPin className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-primary mb-1">{t(`contact_page.areas.items.${loc.id}.title`)}</h3>
                <p className="text-sm text-gray-600">{t(`contact_page.areas.items.${loc.id}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="container py-20 max-w-4xl">
        <h2 className="text-center mb-12">{t('contact_page.faq.title')}</h2>
        <div className="space-y-6">
          {faqs.map((key) => (
            <div key={key} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-primary text-lg mb-2 flex items-start gap-3">
                <span className="text-accent mt-1">Q.</span>
                {t(`contact_page.faq.items.${key}.q`)}
              </h3>
              <p className="text-gray-700 pl-8">
                {t(`contact_page.faq.items.${key}.a`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
