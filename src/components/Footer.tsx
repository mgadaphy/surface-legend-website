
import { useTranslation } from "react-i18next";

export function Footer() {
    const { t } = useTranslation();

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
                                <a href="https://wa.me/237679235879" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                                    679 235 879
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/237692015866" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                                    692 015 866
                                </a>
                            </li>
                            <li>info@surfacelegend.com</li>
                            <li><a href="/contact" className="hover:text-white transition-colors">{t('footer.get_quote')}</a></li>
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
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.follow_us')}</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 text-sm">
                    <p>{t('footer.rights')}</p>
                    <p>
                        {t('footer.developer_credit')} <a href="https://mogadonko.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-medium">MOGADONKO AGENCY</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
