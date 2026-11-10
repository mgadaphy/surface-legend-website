import type { CollectionConfig } from "payload";
import { isAdminOrAbove, loggedIn } from "../access";
import { slugify } from "../../lib/slugify";

export const ARTICLE_CATEGORIES = [
  { value: "painting-tips", label: { en: "Painting tips", fr: "Conseils peinture" } },
  { value: "waterproofing", label: { en: "Waterproofing", fr: "Étanchéité" } },
  { value: "floors-and-coatings", label: { en: "Floors and coatings", fr: "Sols et revêtements" } },
  { value: "maintenance", label: { en: "Maintenance", fr: "Entretien" } },
  { value: "projects", label: { en: "Projects", fr: "Réalisations" } },
  { value: "academy", label: { en: "Academy", fr: "Académie" } },
];

/** The blog at /blog. Visitors only see articles marked "Published". */
export const Articles: CollectionConfig = {
  slug: "articles",
  labels: { singular: { en: "Article", fr: "Article" }, plural: { en: "Blog", fr: "Blog" } },
  admin: {
    hideAPIURL: true,
    useAsTitle: "title",
    defaultColumns: ["title", "category", "published", "publishedAt"],
    group: { en: "Content", fr: "Contenu" },
    description: {
      en: "Articles on the Blog page. Write the English version, then switch Editing language (top right) to French.",
      fr: "Les articles de la page Blog. Rédigez la version anglaise, puis passez la Langue de saisie (en haut à droite) en français.",
    },
  },
  defaultSort: "-publishedAt",
  access: { read: ({ req }) => (req.user ? true : { published: { equals: true } }), create: loggedIn, update: loggedIn, delete: ({ req }) => isAdminOrAbove(req) },
  fields: [
    { name: "title", type: "text", required: true, localized: true, label: { en: "Title", fr: "Titre" } },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      localized: true,
      label: { en: "Summary", fr: "Résumé" },
      admin: {
        rows: 3,
        description: {
          en: "One or two sentences, shown on the Blog page and in Google results (about 150 characters).",
          fr: "Une ou deux phrases, affichées sur la page Blog et dans les résultats Google (environ 150 caractères).",
        },
      },
    },
    {
      name: "body",
      type: "textarea",
      required: true,
      localized: true,
      label: { en: "Article", fr: "Article" },
      admin: {
        rows: 24,
        description: {
          en: "Blank line = new paragraph. Start a line with ## for a heading, ### for a subheading, - for a bullet, 1. for a numbered step. **bold** and [link text](/contact) also work.",
          fr: "Ligne vide = nouveau paragraphe. Commencez une ligne par ## pour un titre, ### pour un sous-titre, - pour une puce, 1. pour une étape numérotée. **gras** et [texte du lien](/contact) fonctionnent aussi.",
        },
      },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      label: { en: "Cover photo", fr: "Photo de couverture" },
    },
    {
      name: "staticCover",
      type: "text",
      label: { en: "Built-in cover", fr: "Couverture d’origine" },
      admin: {
        readOnly: true,
        condition: (data) => Boolean(data?.staticCover),
        description: { en: "Used until you choose a cover photo above.", fr: "Utilisée tant qu’aucune photo n’est choisie ci-dessus." },
      },
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      label: { en: "Web address", fr: "Adresse web" },
      admin: {
        position: "sidebar",
        description: {
          en: "Filled from the English title. Do not change it after publishing: links to the old address would break.",
          fr: "Rempli d’après le titre anglais. Ne la modifiez pas après publication : les liens vers l’ancienne adresse ne marcheraient plus.",
        },
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "painting-tips",
      label: { en: "Category", fr: "Catégorie" },
      options: ARTICLE_CATEGORIES,
      admin: { position: "sidebar" },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
      label: { en: "Published", fr: "Publié" },
      admin: { position: "sidebar", description: { en: "Untick to hide it from the website.", fr: "Décochez pour le masquer du site." } },
    },
    {
      name: "publishedAt",
      type: "date",
      label: { en: "Publication date", fr: "Date de publication" },
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        if (!data) return data;
        // The address comes from the English title, so it stays the same in both languages.
        if (!data.slug && data.title && (req.locale ?? "en") === "en") data.slug = slugify(String(data.title)).slice(0, 80).replace(/-+$/, "");
        if (data.slug) data.slug = slugify(String(data.slug));
        if (data.published && !data.publishedAt) data.publishedAt = new Date().toISOString();
        return data;
      },
    ],
  },
  timestamps: true,
};
