import path from "path";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { en } from "@payloadcms/translations/languages/en";
import { fr } from "@payloadcms/translations/languages/fr";
import sharp from "sharp";
import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Projects } from "./payload/collections/Projects";
import { Articles } from "./payload/collections/Articles";
import { Testimonials } from "./payload/collections/Testimonials";
import { EmailTemplates } from "./payload/collections/EmailTemplates";
import { Enquiries } from "./payload/collections/Enquiries";
import { EmailSettings } from "./payload/globals/EmailSettings";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { SetupState } from "./payload/globals/SetupState";
import { runSetup } from "./payload/seed/run";
import { migrations } from "./payload/migrations";
import { sendEmail } from "./lib/email/send";

const root = process.cwd();

/**
 * Surface Legend's admin (Payload CMS), served at /admin next to the static website.
 * Content is stored in Postgres; uploads in ./media (a Docker volume in production).
 */
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3022",
  secret: process.env.PAYLOAD_SECRET || "",
  routes: { admin: "/admin", api: "/cms-api", graphQL: "/cms-api/graphql", graphQLPlayground: "/cms-api/graphql-playground" },
  admin: {
    user: Users.slug,
    importMap: { baseDir: root },
    meta: {
      titleSuffix: " · Surface Legend admin",
      icons: [{ rel: "icon", type: "image/png", url: "/brand/favicon.png" }],
    },
    components: {
      graphics: {
        Logo: "/components/admin/brand#Logo",
        Icon: "/components/admin/brand#Icon",
      },
      // Show/hide button on every password field.
      providers: ["/components/admin/password-reveal#PasswordReveal"],
      // Sign-in screen: brand panel and heading, then theme switch and link back to the website.
      beforeLogin: ["/components/admin/login-extras#LoginIntro"],
      afterLogin: ["/components/admin/login-extras#LoginFooter"],
      beforeNavLinks: ["/components/admin/brand#NavBrand"],
      actions: ["/components/admin/header-actions#HeaderActions"],
      views: { dashboard: { Component: "/components/admin/dashboard#Dashboard" } },
    },
    dateFormat: "d MMMM yyyy, HH:mm",
    // Built-in initials avatar (Gravatar images are blocked by the security policy and would leak emails).
    avatar: "default",
  },
  // The admin interface itself speaks English or French (each user picks in their account).
  i18n: {
    supportedLanguages: { en, fr },
    fallbackLanguage: "en",
    // Plain words for a few of Payload's built-in labels.
    translations: {
      en: {
        authentication: { login: "Sign in" },
        general: { locale: "Editing language", locales: "Languages", createNew: "Create new", lastModified: "Last saved" },
      },
      fr: {
        general: { locale: "Langue de saisie", locales: "Langues", createNew: "Créer", lastModified: "Dernier enregistrement" },
        fields: { chooseFromExisting: "Choisir parmi les existants" },
      },
    },
  },
  // Content languages: every localised field has an English and a French version.
  localization: {
    locales: [
      { code: "en", label: { en: "English", fr: "Anglais" } },
      { code: "fr", label: { en: "French", fr: "Français" } },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  collections: [Articles, Projects, Testimonials, Media, Enquiries, EmailTemplates, Users],
  globals: [SiteSettings, EmailSettings, SetupState],
  // After migrations: one-time import of email templates, blog articles, portfolio and business details.
  onInit: runSetup,
  // Payload's own emails (password resets) go through the service chosen in Email settings.
  // The sender is read from Email settings at send time; these defaults are only labels.
  email: ({ payload }) => {
    return {
      name: "surface-legend",
      defaultFromAddress: "website@surfacelegend.com",
      defaultFromName: "Surface Legend",
      sendEmail: async (message) => {
        const html = String(message.html ?? "");
        const text = String(message.text ?? html.replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/[ \t]+/g, " ").trim());
        const result = await sendEmail(payload, { to: message.to as string, subject: String(message.subject ?? ""), html, text });
        if (!result.ok) payload.logger.warn(`Email to ${String(message.to)} not sent: ${result.error}`);
        return result;
      },
    };
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    // In development the schema follows the code; in production the committed migrations run on start.
    push: process.env.NODE_ENV !== "production",
    migrationDir: path.resolve(root, "payload/migrations"),
    prodMigrations: migrations,
  }),
  sharp,
  typescript: { outputFile: path.resolve(root, "payload-types.ts") },
  graphQL: { disable: true },
  telemetry: false,
});
