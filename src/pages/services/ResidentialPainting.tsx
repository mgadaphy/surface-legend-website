import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

/**
 * Residential Painting Service Detail Page
 * Design System: Craftsmanship Modernism
 */

export default function ResidentialPainting() {
  const { t } = useTranslation();

  return (
    <ServiceDetail
      title={t('service_details.residential.title')}
      subtitle={t('service_details.residential.subtitle')}
      overview={t('service_details.residential.overview')}
      benefits={[
        t('service_details.residential.benefits.0'),
        t('service_details.residential.benefits.1'),
        t('service_details.residential.benefits.2'),
        t('service_details.residential.benefits.3'),
        t('service_details.residential.benefits.4'),
        t('service_details.residential.benefits.5'),
        t('service_details.residential.benefits.6')
      ]}
      processSteps={[
        t('service_details.residential.process.0'),
        t('service_details.residential.process.1'),
        t('service_details.residential.process.2'),
        t('service_details.residential.process.3'),
        t('service_details.residential.process.4'),
        t('service_details.residential.process.5')
      ]}
      whyChooseUs={[
        t('service_details.residential.why_us.0'),
        t('service_details.residential.why_us.1'),
        t('service_details.residential.why_us.2'),
        t('service_details.residential.why_us.3'),
        t('service_details.residential.why_us.4'),
        t('service_details.residential.why_us.5')
      ]}
      galleryImages={[
        "/assets/images/services/residential_painting_hero.png",
        "/assets/images/services/residential_painting_living_room.png",
        "/assets/images/services/residential_painting_detail.png"
      ]}
    />
  );
}
