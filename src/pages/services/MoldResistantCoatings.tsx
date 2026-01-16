import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

/**
 * Mold-Resistant Coatings Service Detail Page
 * Design System: Craftsmanship Modernism
 */

export default function MoldResistantCoatings() {
    const { t } = useTranslation();

    return (
        <ServiceDetail
            title={t('service_details.mold_resistant.title')}
            subtitle={t('service_details.mold_resistant.subtitle')}
            overview={t('service_details.mold_resistant.overview')}
            benefits={[
                t('service_details.mold_resistant.benefits.0'),
                t('service_details.mold_resistant.benefits.1'),
                t('service_details.mold_resistant.benefits.2'),
                t('service_details.mold_resistant.benefits.3'),
                t('service_details.mold_resistant.benefits.4'),
                t('service_details.mold_resistant.benefits.5'),
                t('service_details.mold_resistant.benefits.6')
            ]}
            processSteps={[
                t('service_details.mold_resistant.process.0'),
                t('service_details.mold_resistant.process.1'),
                t('service_details.mold_resistant.process.2'),
                t('service_details.mold_resistant.process.3'),
                t('service_details.mold_resistant.process.4'),
                t('service_details.mold_resistant.process.5'),
                t('service_details.mold_resistant.process.6')
            ]}
            whyChooseUs={[
                t('service_details.mold_resistant.why_us.0'),
                t('service_details.mold_resistant.why_us.1'),
                t('service_details.mold_resistant.why_us.2'),
                t('service_details.mold_resistant.why_us.3'),
                t('service_details.mold_resistant.why_us.4'),
                t('service_details.mold_resistant.why_us.5')
            ]}
            galleryImages={[
                "/assets/images/services/mold_resistant_bathroom.png",
                "/assets/images/services/mold_resistant_kitchen.png",
                "/assets/images/services/mold_resistant_application.png"
            ]}
        />
    );
}
