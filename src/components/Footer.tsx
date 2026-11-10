
import { useContact, useSocial } from "@/lib/content";
import { useTranslation } from "react-i18next";

export function Footer() {
    const { t } = useTranslation();
    const contact = useContact();
    const social = useSocial();
    const SOCIAL_NAMES = { facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube", linkedin: "LinkedIn", google: "Google" } as const;
    const profiles = (Object.keys(SOCIAL_NAMES) as (keyof typeof SOCIAL_NAMES)[]).filter((k) => social[k]);

    return (
        <footer className="bg-primary/95 text-white py-12">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold mb-4">Surface Legend</h3>
                        <p className="text-white/70 text-sm">
                            {t('footer.tagline')}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>
                                <a href={`https://wa.me/${contact.whatsapp}`} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                                    {contact.whatsappDisplay}
                                </a>
                            </li>
                            <li>
                                <a href={`https://wa.me/${contact.whatsapp2}`} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                                    {contact.whatsapp2Display}
                                </a>
                            </li>
                            <li>{contact.email}</li>
                            <li><a href="/contact" className="hover:text-white transition-colors">{t('footer.get_quote')}</a></li>
                            <li><a href="/blog" className="hover:text-white transition-colors">{t('nav.blog')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.locations')}</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>Douala</li>
                            <li>Yaoundé</li>
                            <li>Bamenda</li>
                            <li>Buea & Limbe</li>
                        </ul>
                    </div>
                    {profiles.length > 0 && (
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.follow_us')}</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            {profiles.map((k) => (
                                <li key={k}><a href={social[k]} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{SOCIAL_NAMES[k]}</a></li>
                            ))}
                        </ul>
                    </div>
                    )}
                </div>

                <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 text-sm">
                    <p>{t('footer.rights')} <a href="/privacy" className="hover:text-white transition-colors underline-offset-2 hover:underline ml-2">{t('footer.privacy')}</a></p>
                    <p>
                        {t('footer.developer_credit')} <a href="https://mogadonko.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-medium">MOGADONKO AGENCY</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
