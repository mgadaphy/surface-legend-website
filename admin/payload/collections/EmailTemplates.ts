import type { CollectionConfig } from "payload";
import { isAdminOrAbove } from "../access";
import { TEMPLATE_INFO, type TemplateKey } from "../../lib/email/defaults";

const keys = Object.keys(TEMPLATE_INFO) as TemplateKey[];

/**
 * The wording of every email the website sends, in English and French.
 * The list is fixed (one entry per email); Admins edit the text, not the list.
 */
export const EmailTemplates: CollectionConfig = {
  slug: "email-templates",
  labels: { singular: { en: "Email template", fr: "Modèle d’e-mail" }, plural: { en: "Email templates", fr: "Modèles d’e-mail" } },
  admin: {
    hideAPIURL: true,
    useAsTitle: "name",
    defaultColumns: ["name", "key", "updatedAt"],
    group: { en: "Emails", fr: "E-mails" },
    description: {
      en: "Change the wording of the emails the website sends. Switch the language at the top right to edit the French version.",
      fr: "Modifiez le texte des e-mails envoyés par le site. Changez de langue en haut à droite pour modifier la version française.",
    },
  },
  access: {
    read: ({ req }) => isAdminOrAbove(req),
    update: ({ req }) => isAdminOrAbove(req),
    // The set of emails is defined by the website; templates are created by the setup migration.
    create: () => false,
    delete: () => false,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, label: { en: "Name", fr: "Nom" }, admin: { width: "60%" } },
        {
          name: "key",
          type: "select",
          required: true,
          unique: true,
          index: true,
          label: { en: "Used for", fr: "Utilisé pour" },
          options: keys.map((k) => ({ value: k, label: TEMPLATE_INFO[k].label })),
          access: { update: () => false },
          admin: { width: "40%" },
        },
      ],
    },
    {
      name: "help",
      type: "ui",
      admin: { components: { Field: "/components/admin/email-template-help#EmailTemplateHelp" } },
    },
    { name: "subject", type: "text", required: true, localized: true, label: { en: "Subject", fr: "Objet" } },
    { name: "heading", type: "text", localized: true, label: { en: "Heading", fr: "Titre" } },
    {
      name: "body",
      type: "textarea",
      required: true,
      localized: true,
      label: { en: "Message", fr: "Message" },
      admin: { rows: 12 },
    },
    {
      type: "row",
      fields: [
        { name: "buttonLabel", type: "text", localized: true, label: { en: "Button text (optional)", fr: "Texte du bouton (facultatif)" }, admin: { width: "50%" } },
        { name: "buttonUrl", type: "text", localized: true, label: { en: "Button link", fr: "Lien du bouton" }, admin: { width: "50%" } },
      ],
    },
    {
      name: "preview",
      type: "ui",
      admin: { components: { Field: "/components/admin/email-preview#EmailPreview" } },
    },
  ],
  timestamps: true,
};
