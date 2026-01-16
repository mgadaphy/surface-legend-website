import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

/**
 * Epoxy Floor Coating Service Detail Page
 * Design System: Craftsmanship Modernism
 */

export default function EpoxyFloorCoating() {
  const { t } = useTranslation();

  return (
    <ServiceDetail
      title={t('service_details.epoxy.title')}
      subtitle={t('service_details.epoxy.subtitle')}
      overview={t('service_details.epoxy.overview')}
      benefits={[
        t('service_details.epoxy.benefits.0'),
        t('service_details.epoxy.benefits.1'),
        t('service_details.epoxy.benefits.2'),
        t('service_details.epoxy.benefits.3'),
        t('service_details.epoxy.benefits.4'),
        t('service_details.epoxy.benefits.5'),
        t('service_details.epoxy.benefits.6')
      ]}
      processSteps={[
        t('service_details.epoxy.process.0'),
        t('service_details.epoxy.process.1'),
        t('service_details.epoxy.process.2'),
        t('service_details.epoxy.process.3'),
        t('service_details.epoxy.process.4'),
        t('service_details.epoxy.process.5')
      ]}
      whyChooseUs={[
        t('service_details.epoxy.why_us.0'),
        t('service_details.epoxy.why_us.1'),
        t('service_details.epoxy.why_us.2'),
        t('service_details.epoxy.why_us.3'),
        t('service_details.epoxy.why_us.4'),
        t('service_details.epoxy.why_us.5')
      ]}
      galleryImages={[
        "/assets/images/services/industrial_painting_floor.png",
        "/assets/images/services/commercial_painting_warehouse.png",
        "/assets/images/services/industrial_painting_pipes.png"
      ]}
    />
  );
}
