import { useContact } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useRef, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

/**
 * Surface Legend Contact Page
 * Design System: Craftsmanship Modernism
 */

export default function Contact() {
  const { t, i18n } = useTranslation();
  const contact = useContact();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "services",
    specificInterest: "residential",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  // Bots fill the hidden field or submit within seconds; the server ignores those.
  const honeypot = useRef<HTMLInputElement>(null);
  const openedAt = useRef(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, name: string) => {
    // A new inquiry type starts its own second question.
    if (name === "type") setFormData({ ...formData, type: value, specificInterest: value === "services" ? "residential" : "" });
    else setFormData({ ...formData, [name]: value });
  };

  const detailLabels: Record<string, Record<string, string>> = {
    services: {
      residential: t('services_page.painting.items.residential.title'),
      commercial: t('services_page.painting.items.commercial.title'),
      interior: t('service_details.interior.title'),
      exterior: t('service_details.exterior.title'),
      roof: t('service_details.roof.title'),
      metal: t('service_details.metal.title'),
      waterproofing: t('service_details.waterproofing.title'),
      epoxy: t('services_page.industrial.items.epoxy.title'),
      decorative: t('services_page.decorative.title'),
    },
    products: { interior: "Interior Paint", exterior: "Exterior Paint", epoxy: "Epoxy Coatings", decorative: "Decorative Paint", bulk: "Bulk Order" },
    academy: { beginner: "Beginner Training", professional: "Professional Upskilling", decorative: "Decorative Arts" },
  };

  const typeLabel = t(`contact_page.inquiry_types.${formData.type}`);
  const detailLabel = detailLabels[formData.type]?.[formData.specificInterest] ?? "";

  // The same inquiry as a WhatsApp message.
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=` + encodeURIComponent(
    `*New Inquiry from Website Contact Form*\n\n` +
    `*Name:* ${formData.name}\n` +
    `*Email:* ${formData.email}\n` +
    `*Phone:* ${formData.phone}\n` +
    `*Type:* ${typeLabel}\n` +
    `*Detail:* ${detailLabel}\n` +
    `*Message:* ${formData.message}`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          type: typeLabel,
          detail: detailLabel,
          message: formData.message,
          consent: "yes",
          locale: i18n.language?.startsWith("fr") ? "fr" : "en",
          page: window.location.pathname,
          website: honeypot.current?.value ?? "",
          elapsed: Date.now() - openedAt.current,
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (res.ok) {
        setSent(true);
        setIsSubmitting(false);
        return;
      }
    } catch {
      // Handled below.
    }
    // The inquiry could not be saved: WhatsApp, as before, so it still reaches the team.
    if (!window.open(whatsappUrl, "_blank")) window.location.href = whatsappUrl;
    setIsSubmitting(false);
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
                      <a href={`https://wa.me/${contact.whatsapp}`} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">{contact.whatsappDisplay}</a>
                    </p>
                    <p className="text-gray-700 font-medium">
                      <a href={`https://wa.me/${contact.whatsapp2}`} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">{contact.whatsapp2Display}</a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{t('contact_page.info.cta_whatsapp')}</p>
                  </div>
                </Card>

                <Card className="p-6 flex items-start gap-4">
                  <Mail className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{t('contact_page.info.email')}</h3>
                    <p className="text-gray-700">{contact.email}</p>
                    <p className="text-gray-700">{contact.quotesEmail}</p>
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

            {sent ? (
              <div className="space-y-5" role="status">
                <h3 className="text-xl font-semibold text-primary">{t('contact_page.form.success_title')}</h3>
                <p className="text-gray-700">{t('contact_page.form.success_body')}</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <Button type="button" className="w-full btn-primary py-6 text-lg">{t('contact_page.form.success_whatsapp')}</Button>
                </a>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
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

              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--accent-dark)]" />
                <span>{t('contact_page.form.consent')} <a href="/privacy" target="_blank" className="underline underline-offset-2 hover:text-primary">{t('footer.privacy')}</a></span>
              </label>

              <Button type="submit" className="w-full btn-primary py-6 text-lg" disabled={isSubmitting}>
                {isSubmitting ? t('contact_page.form.sending') : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    {t('contact_page.form.btn_send')}
                  </span>
                )}
              </Button>
            </form>
            )}
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
