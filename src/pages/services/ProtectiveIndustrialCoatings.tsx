import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

/**
 * Protective Industrial Coatings Service Detail Page
 * Design System: Craftsmanship Modernism
 */

export default function ProtectiveIndustrialCoatings() {
    const { t } = useTranslation();

    return (
        <ServiceDetail
            title={t('service_details.protective_industrial.title')}
            subtitle={t('service_details.protective_industrial.subtitle')}
            overview={t('service_details.protective_industrial.overview')}
            benefits={[
                t('service_details.protective_industrial.benefits.0'),
                t('service_details.protective_industrial.benefits.1'),
                t('service_details.protective_industrial.benefits.2'),
                t('service_details.protective_industrial.benefits.3'),
                t('service_details.protective_industrial.benefits.4'),
                t('service_details.protective_industrial.benefits.5'),
                t('service_details.protective_industrial.benefits.6')
            ]}
            processSteps={[
                t('service_details.protective_industrial.process.0'),
                t('service_details.protective_industrial.process.1'),
                t('service_details.protective_industrial.process.2'),
                t('service_details.protective_industrial.process.3'),
                t('service_details.protective_industrial.process.4'),
                t('service_details.protective_industrial.process.5'),
                t('service_details.protective_industrial.process.6')
            ]}
            whyChooseUs={[
                t('service_details.protective_industrial.why_us.0'),
                t('service_details.protective_industrial.why_us.1'),
                t('service_details.protective_industrial.why_us.2'),
                t('service_details.protective_industrial.why_us.3'),
                t('service_details.protective_industrial.why_us.4'),
                t('service_details.protective_industrial.why_us.5')
            ]}
            galleryImages={[
                "/assets/images/services/protective_industrial_tank.png",
                "/assets/images/services/protective_industrial_equipment.png",
                "/assets/images/services/protective_industrial_coating.png"
            ]}
        />
    );
}
