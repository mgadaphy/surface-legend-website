import type { TemplateContent } from "./render";

/**
 * The emails the website sends, with their default wording in English and French.
 * Editors change the wording in the admin (Email templates); these defaults are used
 * until then, and to fill a new database.
 */
export type TemplateKey = "enquiry-notification" | "enquiry-autoreply" | "password-reset" | "user-welcome" | "test-email";

export const TEMPLATE_INFO: Record<TemplateKey, { label: { en: string; fr: string }; to: { en: string; fr: string }; placeholders: string[] }> = {
  "enquiry-notification": {
    label: { en: "New enquiry (to the team)", fr: "Nouvelle demande (pour l’équipe)" },
    to: { en: "Sent to the team when someone uses the contact form.", fr: "Envoyé à l’équipe quand quelqu’un utilise le formulaire de contact." },
    placeholders: ["name", "email", "phone", "type", "detail", "message", "language", "adminUrl"],
  },
  "enquiry-autoreply": {
    label: { en: "Enquiry received (to the visitor)", fr: "Demande reçue (pour le visiteur)" },
    to: { en: "Sent to the visitor, in their language, to confirm their message arrived.", fr: "Envoyé au visiteur, dans sa langue, pour confirmer la réception de son message." },
    placeholders: ["name", "type", "whatsappUrl", "siteUrl"],
  },
  "password-reset": {
    label: { en: "Password reset", fr: "Réinitialisation du mot de passe" },
    to: { en: "Sent to a staff member who clicks “Forgot password?”.", fr: "Envoyé au membre de l’équipe qui clique sur « Mot de passe oublié ? »." },
    placeholders: ["name", "resetUrl"],
  },
  "user-welcome": {
    label: { en: "Welcome to the admin", fr: "Bienvenue dans l’administration" },
    to: { en: "Sent to a new staff member when an Admin creates their account.", fr: "Envoyé à un nouveau membre quand un administrateur crée son compte." },
    placeholders: ["name", "email", "role", "loginUrl", "resetUrl"],
  },
  "test-email": {
    label: { en: "Test email", fr: "E-mail de test" },
    to: { en: "Sent by the “Send a test email” button in Email settings.", fr: "Envoyé par le bouton « Envoyer un e-mail de test » des paramètres e-mail." },
    placeholders: ["name", "provider"],
  },
};

export const DEFAULT_TEMPLATES: Record<TemplateKey, { en: TemplateContent; fr: TemplateContent }> = {
  "enquiry-notification": {
    en: {
      subject: "New enquiry: {{type}} from {{name}}",
      heading: "New enquiry from the website",
      body: "**{{name}}** sent a message through the contact form.\n\n- Inquiry type: {{type}}\n- Service, product or program: {{detail}}\n- Email: {{email}}\n- Phone / WhatsApp: {{phone}}\n- Language: {{language}}\n\n**Message**\n{{message}}\n\nReply to this email to answer them directly.",
      buttonLabel: "Open in the admin",
      buttonUrl: "{{adminUrl}}",
    },
    fr: {
      subject: "Nouvelle demande : {{type}} de {{name}}",
      heading: "Nouvelle demande depuis le site",
      body: "**{{name}}** a envoyé un message via le formulaire de contact.\n\n- Type de demande : {{type}}\n- Service, produit ou formation : {{detail}}\n- E-mail : {{email}}\n- Téléphone / WhatsApp : {{phone}}\n- Langue : {{language}}\n\n**Message**\n{{message}}\n\nRépondez à cet e-mail pour lui répondre directement.",
      buttonLabel: "Ouvrir dans l’administration",
      buttonUrl: "{{adminUrl}}",
    },
  },
  "enquiry-autoreply": {
    en: {
      subject: "We received your message, {{name}}",
      heading: "Thank you, {{name}}",
      body: "We have received your inquiry about **{{type}}**. We typically respond within 24 hours during business days.\n\nIf it is urgent, you can also reach us on WhatsApp.\n\nThe Surface Legend team",
      buttonLabel: "Chat on WhatsApp",
      buttonUrl: "{{whatsappUrl}}",
    },
    fr: {
      subject: "Nous avons bien reçu votre message, {{name}}",
      heading: "Merci, {{name}}",
      body: "Nous avons bien reçu votre demande concernant **{{type}}**. Nous répondons généralement sous 24 heures les jours ouvrables.\n\nEn cas d’urgence, vous pouvez aussi nous écrire sur WhatsApp.\n\nL’équipe Surface Legend",
      buttonLabel: "Écrire sur WhatsApp",
      buttonUrl: "{{whatsappUrl}}",
    },
  },
  "password-reset": {
    en: {
      subject: "Reset your Surface Legend admin password",
      heading: "Reset your password",
      body: "Hello {{name}},\n\nSomeone asked to reset the password of your Surface Legend admin account. Click the button to choose a new one. The link works for one hour.\n\nIf you did not ask for this, ignore this email: your password stays the same.",
      buttonLabel: "Choose a new password",
      buttonUrl: "{{resetUrl}}",
    },
    fr: {
      subject: "Réinitialisez votre mot de passe Surface Legend",
      heading: "Réinitialisez votre mot de passe",
      body: "Bonjour {{name}},\n\nUne demande de réinitialisation du mot de passe de votre compte d’administration Surface Legend a été faite. Cliquez sur le bouton pour en choisir un nouveau. Le lien est valable une heure.\n\nSi vous n’êtes pas à l’origine de cette demande, ignorez cet e-mail : votre mot de passe reste inchangé.",
      buttonLabel: "Choisir un nouveau mot de passe",
      buttonUrl: "{{resetUrl}}",
    },
  },
  "user-welcome": {
    en: {
      subject: "Your Surface Legend admin account is ready",
      heading: "Welcome, {{name}}",
      body: "An account has been created for you in the Surface Legend website admin, with the role **{{role}}**.\n\nYour login is your email address ({{email}}). Click the button to set your own password, then sign in at the admin.",
      buttonLabel: "Set my password",
      buttonUrl: "{{resetUrl}}",
    },
    fr: {
      subject: "Votre compte d’administration Surface Legend est prêt",
      heading: "Bienvenue, {{name}}",
      body: "Un compte a été créé pour vous dans l’administration du site Surface Legend, avec le rôle **{{role}}**.\n\nVotre identifiant est votre adresse e-mail ({{email}}). Cliquez sur le bouton pour définir votre propre mot de passe, puis connectez-vous à l’administration.",
      buttonLabel: "Définir mon mot de passe",
      buttonUrl: "{{resetUrl}}",
    },
  },
  "test-email": {
    en: {
      subject: "Test email from the Surface Legend website",
      heading: "It works",
      body: "Hello {{name}},\n\nThis test email was sent through **{{provider}}**. The website can now send contact-form notifications, replies to visitors and password resets.",
    },
    fr: {
      subject: "E-mail de test du site Surface Legend",
      heading: "Ça fonctionne",
      body: "Bonjour {{name}},\n\nCet e-mail de test a été envoyé via **{{provider}}**. Le site peut désormais envoyer les notifications du formulaire de contact, les réponses aux visiteurs et les réinitialisations de mot de passe.",
    },
  },
};
