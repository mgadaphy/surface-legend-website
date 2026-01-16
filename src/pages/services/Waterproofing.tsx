import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

export default function Waterproofing() {
    const { t } = useTranslation();

    return (
        <ServiceDetail
            title={t('service_details.waterproofing.title')}
            subtitle={t('service_details.waterproofing.subtitle')}
            overview={t('service_details.waterproofing.overview')}
            benefits={[
                t('service_details.waterproofing.benefits.0'),
                t('service_details.waterproofing.benefits.1'),
                t('service_details.waterproofing.benefits.2'),
                t('service_details.waterproofing.benefits.3'),
                t('service_details.waterproofing.benefits.4'),
                t('service_details.waterproofing.benefits.5'),
                t('service_details.waterproofing.benefits.6')
            ]}
            processSteps={[
                t('service_details.waterproofing.process.0'),
                t('service_details.waterproofing.process.1'),
                t('service_details.waterproofing.process.2'),
                t('service_details.waterproofing.process.3'),
                t('service_details.waterproofing.process.4'),
                t('service_details.waterproofing.process.5')
            ]}
            whyChooseUs={[
                t('service_details.waterproofing.why_us.0'),
                t('service_details.waterproofing.why_us.1'),
                t('service_details.waterproofing.why_us.2'),
                t('service_details.waterproofing.why_us.3'),
                t('service_details.waterproofing.why_us.4'),
                t('service_details.waterproofing.why_us.5')
            ]}
            galleryImages={[
                "/assets/images/services/waterproofing_terrace.png",
                "/assets/images/services/exterior_painting_villa.png",
                "/assets/images/services/industrial_painting_floor.png"
            ]}
        />
    );
}
