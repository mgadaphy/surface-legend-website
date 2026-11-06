import type { CollectionConfig } from "payload";
import { isAdminOrAbove, loggedIn } from "../access";

/** The Portfolio page. Projects imported from the first version keep their built-in photo until another is chosen. */
export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: { en: "Project", fr: "Réalisation" }, plural: { en: "Portfolio", fr: "Réalisations" } },
  admin: {
    hideAPIURL: true,
    useAsTitle: "title",
    defaultColumns: ["title", "category", "show", "order"],
    group: { en: "Content", fr: "Contenu" },
    description: {
      en: "The projects on the Portfolio page. Write the title and description in English and French (Editing language, top right).",
      fr: "Les projets de la page Réalisations. Rédigez le titre et la description en anglais et en français (Langue de saisie, en haut à droite).",
    },
  },
  defaultSort: "order",
  // Visitors only ever see projects marked "Show on the website".
  access: { read: ({ req }) => (req.user ? true : { show: { equals: true } }), create: loggedIn, update: loggedIn, delete: ({ req }) => isAdminOrAbove(req) },
  fields: [
    { name: "title", type: "text", required: true, localized: true, label: { en: "Title", fr: "Titre" } },
    { name: "description", type: "textarea", localized: true, label: { en: "Description", fr: "Description" }, admin: { rows: 3 } },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: { en: "Photo", fr: "Photo" },
      validate: (value: unknown, { siblingData }: { siblingData: unknown }) =>
        value || (siblingData as { staticImage?: string })?.staticImage ? true : "Choose or upload a photo.",
    },
    {
      name: "staticImage",
      type: "text",
      label: { en: "Built-in photo", fr: "Photo d’origine" },
      admin: {
        readOnly: true,
        condition: (data) => Boolean(data?.staticImage),
        description: { en: "Used until you choose a photo above.", fr: "Utilisée tant qu’aucune photo n’est choisie ci-dessus." },
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "residential",
      label: { en: "Category", fr: "Catégorie" },
      options: [
        { value: "residential", label: { en: "Residential", fr: "Résidentiel" } },
        { value: "commercial", label: { en: "Commercial", fr: "Commercial" } },
        { value: "epoxy", label: { en: "Epoxy flooring", fr: "Sols époxy" } },
      ],
      admin: { position: "sidebar" },
    },
    { name: "show", type: "checkbox", defaultValue: true, label: { en: "Show on the website", fr: "Afficher sur le site" }, admin: { position: "sidebar" } },
    { name: "order", type: "number", defaultValue: 100, label: { en: "Order (smaller first)", fr: "Ordre (plus petit d’abord)" }, admin: { position: "sidebar" } },
  ],
  timestamps: true,
};
