import { ServiceDetail } from "@/components/ServiceDetail";
import { useTranslation } from "react-i18next";

export default function InteriorPainting() {
    const { t } = useTranslation();

    return (
        <ServiceDetail
            title={t('service_details.interior.title')}
            subtitle={t('service_details.interior.subtitle')}
            overview={t('service_details.interior.overview')}
            benefits={[
                t('service_details.interior.benefits.0'),
                t('service_details.interior.benefits.1'),
                t('service_details.interior.benefits.2'),
                t('service_details.interior.benefits.3'),
                t('service_details.interior.benefits.4'),
                t('service_details.interior.benefits.5'),
                t('service_details.interior.benefits.6')
            ]}
            processSteps={[
                t('service_details.interior.process.0'),
                t('service_details.interior.process.1'),
                t('service_details.interior.process.2'),
                t('service_details.interior.process.3'),
                t('service_details.interior.process.4'),
                t('service_details.interior.process.5')
            ]}
            whyChooseUs={[
                t('service_details.interior.why_us.0'),
                t('service_details.interior.why_us.1'),
                t('service_details.interior.why_us.2'),
                t('service_details.interior.why_us.3'),
                t('service_details.interior.why_us.4'),
                t('service_details.interior.why_us.5')
            ]}
            galleryImages={[
                "/assets/images/services/interior_painting_bedroom.png",
                "/assets/images/services/residential_painting_living_room.png",
                "/assets/images/services/interior_painting_kitchen.png"
            ]}
        />
    );
}
