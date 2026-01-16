import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

export default function RoofPainting() {
    const { t } = useTranslation();

    return (
        <ServiceDetail
            title={t('service_details.roof.title')}
            subtitle={t('service_details.roof.subtitle')}
            overview={t('service_details.roof.overview')}
            benefits={[
                t('service_details.roof.benefits.0'),
                t('service_details.roof.benefits.1'),
                t('service_details.roof.benefits.2'),
                t('service_details.roof.benefits.3'),
                t('service_details.roof.benefits.4'),
                t('service_details.roof.benefits.5'),
                t('service_details.roof.benefits.6')
            ]}
            processSteps={[
                t('service_details.roof.process.0'),
                t('service_details.roof.process.1'),
                t('service_details.roof.process.2'),
                t('service_details.roof.process.3'),
                t('service_details.roof.process.4'),
                t('service_details.roof.process.5'),
                t('service_details.roof.process.6') // Added 7th step as defined in translation
            ]}
            whyChooseUs={[
                t('service_details.roof.why_us.0'),
                t('service_details.roof.why_us.1'),
                t('service_details.roof.why_us.2'),
                t('service_details.roof.why_us.3'),
                t('service_details.roof.why_us.4'),
                t('service_details.roof.why_us.5')
            ]}
            galleryImages={[
                "/assets/images/services/roof_painting_red.png",
                "/assets/images/services/exterior_painting_house.png",
                "/assets/images/services/commercial_painting_exterior.png"
            ]}
        />
    );
}
