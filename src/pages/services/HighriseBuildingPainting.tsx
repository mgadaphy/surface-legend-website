import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

/**
 * High-Rise Building Painting Service Detail Page
 * Design System: Craftsmanship Modernism
 */

export default function HighriseBuildingPainting() {
    const { t } = useTranslation();

    return (
        <ServiceDetail
            title={t('service_details.highrise.title')}
            subtitle={t('service_details.highrise.subtitle')}
            overview={t('service_details.highrise.overview')}
            benefits={[
                t('service_details.highrise.benefits.0'),
                t('service_details.highrise.benefits.1'),
                t('service_details.highrise.benefits.2'),
                t('service_details.highrise.benefits.3'),
                t('service_details.highrise.benefits.4'),
                t('service_details.highrise.benefits.5'),
                t('service_details.highrise.benefits.6')
            ]}
            processSteps={[
                t('service_details.highrise.process.0'),
                t('service_details.highrise.process.1'),
                t('service_details.highrise.process.2'),
                t('service_details.highrise.process.3'),
                t('service_details.highrise.process.4'),
                t('service_details.highrise.process.5'),
                t('service_details.highrise.process.6')
            ]}
            whyChooseUs={[
                t('service_details.highrise.why_us.0'),
                t('service_details.highrise.why_us.1'),
                t('service_details.highrise.why_us.2'),
                t('service_details.highrise.why_us.3'),
                t('service_details.highrise.why_us.4'),
                t('service_details.highrise.why_us.5')
            ]}
            galleryImages={[
                "/assets/images/services/highrise_scaffolding.png",
                "/assets/images/services/highrise_building.png",
                "/assets/images/services/highrise_workers.png"
            ]}
        />
    );
}
