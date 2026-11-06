import type { CollectionConfig } from "payload";
import { isAdminOrAbove, loggedIn } from "../access";

/**
 * Messages sent through the website's contact form.
 * Every enquiry is saved here first, so none is lost even when email sending is off or fails.
 */
export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: { singular: { en: "Enquiry", fr: "Demande" }, plural: { en: "Enquiries", fr: "Demandes" } },
  admin: {
    hideAPIURL: true,
    useAsTitle: "name",
    defaultColumns: ["name", "type", "status", "createdAt", "assignedTo"],
    listSearchableFields: ["name", "email", "phone", "message"],
    group: { en: "Emails", fr: "E-mails" },
    description: {
      en: "Messages from the contact form. Change the status as you follow up, and keep notes for the team.",
      fr: "Messages du formulaire de contact. Changez le statut au fil du suivi et gardez des notes pour l’équipe.",
    },
  },
  defaultSort: "-createdAt",
  access: {
    read: loggedIn,
    update: loggedIn,
    // Only the website creates enquiries (server side, from the contact form).
    create: () => false,
    delete: ({ req }) => isAdminOrAbove(req),
  },
  fields: [
    {
      name: "actions",
      type: "ui",
      admin: { components: { Field: "/components/admin/enquiry-actions#EnquiryActions" } },
    },
    { name: "name", type: "text", required: true, label: { en: "Name", fr: "Nom" }, admin: { readOnly: true } },
    {
      type: "row",
      fields: [
        { name: "email", type: "email", required: true, label: { en: "Email", fr: "E-mail" }, admin: { readOnly: true, width: "50%" } },
        { name: "phone", type: "text", label: { en: "Phone / WhatsApp", fr: "Téléphone / WhatsApp" }, admin: { readOnly: true, width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "type", type: "text", label: { en: "Inquiry type", fr: "Type de demande" }, admin: { readOnly: true, width: "50%" } },
        { name: "detail", type: "text", label: { en: "Service, product or program", fr: "Service, produit ou formation" }, admin: { readOnly: true, width: "50%" } },
      ],
    },
    { name: "message", type: "textarea", label: { en: "Message", fr: "Message" }, admin: { readOnly: true, rows: 8 } },
    {
      name: "notes",
      type: "array",
      label: { en: "Team notes", fr: "Notes de l’équipe" },
      labels: { singular: { en: "Note", fr: "Note" }, plural: { en: "Notes", fr: "Notes" } },
      admin: { description: { en: "Only the team sees these.", fr: "Visibles uniquement par l’équipe." } },
      fields: [
        { name: "text", type: "textarea", required: true, label: { en: "Note", fr: "Note" } },
        {
          type: "row",
          fields: [
            { name: "author", type: "relationship", relationTo: "users", label: { en: "By", fr: "Par" }, admin: { readOnly: true, width: "50%" } },
            { name: "date", type: "date", label: { en: "Date", fr: "Date" }, admin: { readOnly: true, width: "50%", date: { pickerAppearance: "dayAndTime" } } },
          ],
        },
      ],
    },
    // Sidebar: follow-up
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      index: true,
      label: { en: "Status", fr: "Statut" },
      options: [
        { value: "new", label: { en: "New", fr: "Nouvelle" } },
        { value: "in-progress", label: { en: "In progress", fr: "En cours" } },
        { value: "replied", label: { en: "Replied", fr: "Répondu" } },
        { value: "won", label: { en: "Won (client)", fr: "Gagnée (client)" } },
        { value: "lost", label: { en: "Closed, no deal", fr: "Close, sans suite" } },
        { value: "spam", label: { en: "Spam", fr: "Indésirable" } },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
      label: { en: "Handled by", fr: "Suivie par" },
      admin: { position: "sidebar" },
    },
    { name: "repliedAt", type: "date", label: { en: "First reply", fr: "Première réponse" }, admin: { position: "sidebar", readOnly: true, date: { pickerAppearance: "dayAndTime" } } },
    {
      name: "locale",
      type: "select",
      label: { en: "Language", fr: "Langue" },
      options: [
        { value: "en", label: { en: "English", fr: "Anglais" } },
        { value: "fr", label: { en: "French", fr: "Français" } },
      ],
      admin: { position: "sidebar", readOnly: true },
    },
    { name: "page", type: "text", label: { en: "Sent from page", fr: "Envoyée depuis la page" }, admin: { position: "sidebar", readOnly: true } },
    {
      name: "emailLog",
      type: "group",
      label: { en: "Emails sent", fr: "E-mails envoyés" },
      admin: { position: "sidebar", readOnly: true },
      fields: [
        { name: "team", type: "text", label: { en: "To the team", fr: "À l’équipe" } },
        { name: "visitor", type: "text", label: { en: "To the visitor", fr: "Au visiteur" } },
      ],
    },
    { name: "consentAt", type: "date", label: { en: "Consent given", fr: "Consentement donné" }, admin: { position: "sidebar", readOnly: true, date: { pickerAppearance: "dayAndTime" } } },
  ],
  hooks: {
    beforeChange: [
      ({ data, req, originalDoc }) => {
        // Sign and date new notes.
        if (Array.isArray(data.notes)) {
          data.notes = data.notes.map((n: { author?: unknown; date?: string }) => ({
            ...n,
            author: n.author ?? req.user?.id,
            date: n.date ?? new Date().toISOString(),
          }));
        }
        if (data.status === "replied" && !originalDoc?.repliedAt && !data.repliedAt) data.repliedAt = new Date().toISOString();
        if (data.status && data.status !== "new" && !data.assignedTo && !originalDoc?.assignedTo && req.user) data.assignedTo = req.user.id;
        return data;
      },
    ],
  },
  timestamps: true,
};
