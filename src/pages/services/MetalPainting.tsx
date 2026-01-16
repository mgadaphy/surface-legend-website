import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

export default function MetalPainting() {
    const { t } = useTranslation();

    return (
        <ServiceDetail
            title={t('service_details.metal.title')}
            subtitle={t('service_details.metal.subtitle')}
            overview={t('service_details.metal.overview')}
            benefits={[
                t('service_details.metal.benefits.0'),
                t('service_details.metal.benefits.1'),
                t('service_details.metal.benefits.2'),
                t('service_details.metal.benefits.3'),
                t('service_details.metal.benefits.4'),
                t('service_details.metal.benefits.5'),
                t('service_details.metal.benefits.6')
            ]}
            processSteps={[
                t('service_details.metal.process.0'),
                t('service_details.metal.process.1'),
                t('service_details.metal.process.2'),
                t('service_details.metal.process.3'),
                t('service_details.metal.process.4'),
                t('service_details.metal.process.5'),
                t('service_details.metal.process.6') // Added 7th step as defined in translation
            ]}
            whyChooseUs={[
                t('service_details.metal.why_us.0'),
                t('service_details.metal.why_us.1'),
                t('service_details.metal.why_us.2'),
                t('service_details.metal.why_us.3'),
                t('service_details.metal.why_us.4'),
                t('service_details.metal.why_us.5')
            ]}
            galleryImages={[
                "/assets/images/services/metal_gate_painting.png",
                "/assets/images/services/industrial_painting_pipes.png",
                "/assets/images/services/roof_painting_red.png"
            ]}
        />
    );
}
