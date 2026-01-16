import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

/**
 * Exterior Painting Service Detail Page
 * Design System: Craftsmanship Modernism
 */

export default function ExteriorPainting() {
  const { t } = useTranslation();

  return (
    <ServiceDetail
      title={t('service_details.exterior.title')}
      subtitle={t('service_details.exterior.subtitle')}
      overview={t('service_details.exterior.overview')}
      benefits={[
        t('service_details.exterior.benefits.0'),
        t('service_details.exterior.benefits.1'),
        t('service_details.exterior.benefits.2'),
        t('service_details.exterior.benefits.3'),
        t('service_details.exterior.benefits.4'),
        t('service_details.exterior.benefits.5'),
        t('service_details.exterior.benefits.6')
      ]}
      processSteps={[
        t('service_details.exterior.process.0'),
        t('service_details.exterior.process.1'),
        t('service_details.exterior.process.2'),
        t('service_details.exterior.process.3'),
        t('service_details.exterior.process.4'),
        t('service_details.exterior.process.5')
      ]}
      whyChooseUs={[
        t('service_details.exterior.why_us.0'),
        t('service_details.exterior.why_us.1'),
        t('service_details.exterior.why_us.2'),
        t('service_details.exterior.why_us.3'),
        t('service_details.exterior.why_us.4'),
        t('service_details.exterior.why_us.5')
      ]}
      galleryImages={[
        "/assets/images/services/exterior_painting_house.png",
        "/assets/images/services/exterior_painting_villa.png",
        "/assets/images/services/commercial_painting_exterior.png"
      ]}
      heroImage="/assets/images/services/exterior_painting_house.png"
    />
  );
}
