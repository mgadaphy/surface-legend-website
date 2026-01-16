import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

/**
 * POP & Decorative Finishes Service Detail Page
 * Design System: Craftsmanship Modernism
 */

export default function POPDecorativeFinishes() {
  const { t } = useTranslation();

  return (
    <ServiceDetail
      title={t('service_details.pop_decorative.title')}
      subtitle={t('service_details.pop_decorative.subtitle')}
      overview={t('service_details.pop_decorative.overview')}
      benefits={[
        t('service_details.pop_decorative.benefits.0'),
        t('service_details.pop_decorative.benefits.1'),
        t('service_details.pop_decorative.benefits.2'),
        t('service_details.pop_decorative.benefits.3'),
        t('service_details.pop_decorative.benefits.4'),
        t('service_details.pop_decorative.benefits.5'),
        t('service_details.pop_decorative.benefits.6')
      ]}
      processSteps={[
        t('service_details.pop_decorative.process.0'),
        t('service_details.pop_decorative.process.1'),
        t('service_details.pop_decorative.process.2'),
        t('service_details.pop_decorative.process.3'),
        t('service_details.pop_decorative.process.4'),
        t('service_details.pop_decorative.process.5')
      ]}
      whyChooseUs={[
        t('service_details.pop_decorative.why_us.0'),
        t('service_details.pop_decorative.why_us.1'),
        t('service_details.pop_decorative.why_us.2'),
        t('service_details.pop_decorative.why_us.3'),
        t('service_details.pop_decorative.why_us.4'),
        t('service_details.pop_decorative.why_us.5')
      ]}
      galleryImages={[
        "/assets/images/services/pop_ceiling_design.png",
        "/assets/images/services/pop_decorative_cornice.png",
        "/assets/images/services/residential_painting_living_room.png"
      ]}
    />
  );
}
