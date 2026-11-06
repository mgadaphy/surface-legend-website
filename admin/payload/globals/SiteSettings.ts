import type { GlobalConfig } from "payload";
import { isAdminOrAbove } from "../access";

const digits = (v: string | null | undefined) => (/^\d{10,15}$/.test(v ?? "") ? true : "Digits only, with the country code (for example 237679235879).");
const digitsHelp = { en: "Digits only, with the country code, e.g. 237679235879.", fr: "Chiffres uniquement, avec l’indicatif, par ex. 237679235879." };

/** The contact details shown across the website. Changes appear on the next page visit. */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: { en: "Business details", fr: "Informations de l’entreprise" },
  admin: {
    hideAPIURL: true,
    group: { en: "Settings", fr: "Paramètres" },
    description: {
      en: "The phone numbers and email addresses shown on every page of the website, and used by its WhatsApp buttons.",
      fr: "Les numéros et adresses e-mail affichés sur toutes les pages du site, et utilisés par ses boutons WhatsApp.",
    },
  },
  access: { read: () => true, update: ({ req }) => isAdminOrAbove(req) },
  fields: [
    {
      type: "row",
      fields: [
        { name: "whatsapp", type: "text", required: true, defaultValue: "237679235879", validate: digits, label: { en: "Main WhatsApp number", fr: "Numéro WhatsApp principal" }, admin: { width: "50%", description: digitsHelp } },
        { name: "whatsapp2", type: "text", required: true, defaultValue: "237692015866", validate: digits, label: { en: "Second WhatsApp number", fr: "Deuxième numéro WhatsApp" }, admin: { width: "50%", description: digitsHelp } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "email", type: "email", required: true, defaultValue: "info@surfacelegend.com", label: { en: "Public email", fr: "E-mail public" }, admin: { width: "50%" } },
        { name: "quotesEmail", type: "email", required: true, defaultValue: "quotes@surfacelegend.com", label: { en: "Quotes email", fr: "E-mail pour les devis" }, admin: { width: "50%" } },
      ],
    },
  ],
};
