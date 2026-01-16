import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

/**
 * Commercial Painting Service Detail Page
 * Design System: Craftsmanship Modernism
 */

export default function CommercialPainting() {
  const { t } = useTranslation();

  return (
    <ServiceDetail
      title={t('service_details.commercial.title')}
      subtitle={t('service_details.commercial.subtitle')}
      overview={t('service_details.commercial.overview')}
      benefits={[
        t('service_details.commercial.benefits.0'),
        t('service_details.commercial.benefits.1'),
        t('service_details.commercial.benefits.2'),
        t('service_details.commercial.benefits.3'),
        t('service_details.commercial.benefits.4'),
        t('service_details.commercial.benefits.5'),
        t('service_details.commercial.benefits.6')
      ]}
      processSteps={[
        t('service_details.commercial.process.0'),
        t('service_details.commercial.process.1'),
        t('service_details.commercial.process.2'),
        t('service_details.commercial.process.3'),
        t('service_details.commercial.process.4'),
        t('service_details.commercial.process.5')
      ]}
      whyChooseUs={[
        t('service_details.commercial.why_us.0'),
        t('service_details.commercial.why_us.1'),
        t('service_details.commercial.why_us.2'),
        t('service_details.commercial.why_us.3'),
        t('service_details.commercial.why_us.4'),
        t('service_details.commercial.why_us.5')
      ]}
      galleryImages={[
        "/assets/images/services/commercial_painting_office.png",
        "/assets/images/services/commercial_painting_exterior.png",
        "/assets/images/services/commercial_painting_warehouse.png"
      ]}
    />
  );
}
