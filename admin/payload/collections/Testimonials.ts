import type { CollectionConfig } from "payload";
import { isAdminOrAbove, loggedIn } from "../access";

/** What clients say, shown on the home page. */
export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: { en: "Testimonial", fr: "Témoignage" }, plural: { en: "Testimonials", fr: "Témoignages" } },
  admin: {
    hideAPIURL: true,
    useAsTitle: "name",
    defaultColumns: ["name", "role", "show", "order"],
    group: { en: "Content", fr: "Contenu" },
    description: {
      en: "Only publish words the client has approved. The home page shows them three to a row.",
      fr: "Ne publiez que des propos validés par le client. La page d’accueil les affiche par rangées de trois.",
    },
  },
  defaultSort: "order",
  // Visitors only ever see testimonials marked "Show on the website".
  access: { read: ({ req }) => (req.user ? true : { show: { equals: true } }), create: loggedIn, update: loggedIn, delete: ({ req }) => isAdminOrAbove(req) },
  fields: [
    { name: "name", type: "text", required: true, label: { en: "Name", fr: "Nom" } },
    { name: "role", type: "text", required: true, localized: true, label: { en: "Role and place", fr: "Fonction et lieu" } },
    { name: "quote", type: "textarea", required: true, localized: true, label: { en: "What they said", fr: "Ce que le client a dit" }, admin: { rows: 5 } },
    { name: "show", type: "checkbox", defaultValue: true, label: { en: "Show on the website", fr: "Afficher sur le site" }, admin: { position: "sidebar" } },
    { name: "order", type: "number", defaultValue: 100, label: { en: "Order (smaller first)", fr: "Ordre (plus petit d’abord)" }, admin: { position: "sidebar" } },
  ],
  timestamps: true,
};
