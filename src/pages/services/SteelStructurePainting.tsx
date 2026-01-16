import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

/**
 * Steel Structure Painting Service Detail Page
 * Design System: Craftsmanship Modernism
 */

export default function SteelStructurePainting() {
    const { t } = useTranslation();

    return (
        <ServiceDetail
            title={t('service_details.steel_structure.title')}
            subtitle={t('service_details.steel_structure.subtitle')}
            overview={t('service_details.steel_structure.overview')}
            benefits={[
                t('service_details.steel_structure.benefits.0'),
                t('service_details.steel_structure.benefits.1'),
                t('service_details.steel_structure.benefits.2'),
                t('service_details.steel_structure.benefits.3'),
                t('service_details.steel_structure.benefits.4'),
                t('service_details.steel_structure.benefits.5'),
                t('service_details.steel_structure.benefits.6')
            ]}
            processSteps={[
                t('service_details.steel_structure.process.0'),
                t('service_details.steel_structure.process.1'),
                t('service_details.steel_structure.process.2'),
                t('service_details.steel_structure.process.3'),
                t('service_details.steel_structure.process.4'),
                t('service_details.steel_structure.process.5'),
                t('service_details.steel_structure.process.6')
            ]}
            whyChooseUs={[
                t('service_details.steel_structure.why_us.0'),
                t('service_details.steel_structure.why_us.1'),
                t('service_details.steel_structure.why_us.2'),
                t('service_details.steel_structure.why_us.3'),
                t('service_details.steel_structure.why_us.4'),
                t('service_details.steel_structure.why_us.5')
            ]}
            galleryImages={[
                "/assets/images/services/steel_structure_factory.png",
                "/assets/images/services/steel_structure_beams.png",
                "/assets/images/services/steel_structure_industrial.png"
            ]}
        />
    );
}
