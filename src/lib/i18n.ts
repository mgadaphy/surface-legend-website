import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../locales/en/translation.json";
import fr from "../locales/fr/translation.json";

// For simple deployment without a backend, we can direct import JSONs
// or use "i18next-http-backend" to load them.
// Direct import is safer for Vite static builds if we don't want to manage public path issues.
// However, the plan said "public/locales".
// Let's use resources object directly for simplicity in this demo phase.

const resources = {
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
        detection: {
            order: ["querystring", "localStorage", "navigator"],
            lookupQuerystring: "lang",
            lookupLocalStorage: "i18nextLng",
        },
    });

export default i18n;
