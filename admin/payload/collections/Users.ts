import { APIError, type CollectionConfig, type PayloadRequest, type Where } from "payload";
import { isAdminOrAbove, isSuperAdmin, type Role } from "../access";
import { loadTemplate, sendTemplate } from "../../lib/email/send";
import { renderEmail } from "../../lib/email/render";

const ROLE_LABEL: Record<Role, { en: string; fr: string }> = {
  superadmin: { en: "Super Admin", fr: "Super administrateur" },
  admin: { en: "Admin", fr: "Administrateur" },
  editor: { en: "Editor", fr: "Éditeur" },
};
const siteURL = (req: { payload: { config: { serverURL?: string } } }) => (req.payload.config.serverURL || "http://localhost:3022").replace(/\/$/, "");
const uiLang = (req: { i18n?: { language?: string } }) => (req.i18n?.language === "fr" ? "fr" : "en");

/** The password-reset email, built from the editable "Password reset" template. */
async function resetEmail(args?: { req?: PayloadRequest; token?: string; user?: { name?: string; email?: string } }) {
  const req = args!.req!;
  const lang = uiLang(req);
  const tpl = await loadTemplate(req.payload, "password-reset", lang);
  const user = args?.user;
  return renderEmail(tpl, { name: user?.name || user?.email, resetUrl: `${siteURL(req)}/admin/reset/${args?.token}` }, lang);
}

/**
 * Staff accounts.
 * - Super Admin: everything, including other admins and technical settings.
 * - Admin (site owner): content, business details, and Editor accounts.
 * - Editor: portfolio, testimonials, images and enquiries.
 */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: { en: "User", fr: "Utilisateur" }, plural: { en: "Users", fr: "Utilisateurs" } },
  admin: {
    hideAPIURL: true,
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: { en: "Settings", fr: "Paramètres" },
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 8 * 60 * 60,
    forgotPassword: {
      expiration: 60 * 60 * 1000,
      generateEmailHTML: async (args) => (await resetEmail(args)).html,
      generateEmailSubject: async (args) => (await resetEmail(args)).subject,
    },
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => isAdminOrAbove(req),
    // Super Admin edits anyone; Admin edits Editors and themselves; everyone edits their own account.
    update: ({ req }) => {
      if (!req.user) return false;
      if (isSuperAdmin(req)) return true;
      const own: Where = { id: { equals: req.user.id } };
      if (isAdminOrAbove(req)) return { or: [{ role: { equals: "editor" } }, own] };
      return own;
    },
    delete: ({ req }) => {
      if (isSuperAdmin(req)) return true;
      if (isAdminOrAbove(req)) return { role: { equals: "editor" } };
      return false;
    },
  },
  fields: [
    { name: "name", type: "text", required: true, label: { en: "Full name", fr: "Nom complet" } },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      label: { en: "Role", fr: "Rôle" },
      options: [
        { value: "superadmin", label: { en: "Super Admin", fr: "Super administrateur" } },
        { value: "admin", label: { en: "Admin (site owner)", fr: "Administrateur (propriétaire)" } },
        { value: "editor", label: { en: "Editor (portfolio and enquiries)", fr: "Éditeur (réalisations et demandes)" } },
      ],
      access: { update: ({ req }) => isAdminOrAbove(req) },
      admin: { position: "sidebar" },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation, originalDoc }) => {
        // The very first account created on a new site is the Super Admin.
        if (operation === "create") {
          const existing = await req.payload.count({ collection: "users", overrideAccess: true });
          if (existing.totalDocs === 0) {
            // On a new server, only the owner's email may claim the first (Super Admin) account.
            const allowed = process.env.FIRST_ADMIN_EMAIL?.trim().toLowerCase();
            if (allowed && String(data.email ?? "").trim().toLowerCase() !== allowed) {
              throw new APIError("The first account must use the owner's email address (FIRST_ADMIN_EMAIL).", 403);
            }
            return { ...data, role: "superadmin" };
          }
        }
        if (!req.user) return data;
        const nextRole = data.role as Role | undefined;
        // Only a Super Admin can create, promote to, or change a Super Admin.
        if (!isSuperAdmin(req) && (nextRole === "superadmin" || originalDoc?.role === "superadmin")) {
          throw new APIError("Only a Super Admin can manage Super Admin accounts.", 403);
        }
        return data;
      },
    ],
    afterChange: [
      // Welcome email when an Admin creates an account: a link to set their own password (valid 3 days).
      async ({ doc, operation, req }) => {
        if (operation !== "create" || !req.user || !doc.email) return doc;
        try {
          const token = await req.payload.forgotPassword({ collection: "users", data: { email: doc.email }, disableEmail: true, req });
          if (!token) return doc;
          await req.payload.db.updateOne({
            collection: "users",
            where: { id: { equals: doc.id } },
            data: { resetPasswordExpiration: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() },
            req,
          });
          const lang = uiLang(req);
          const result = await sendTemplate(req.payload, "user-welcome", lang, doc.email, {
            name: doc.name,
            email: doc.email,
            role: ROLE_LABEL[(doc.role as Role) ?? "editor"][lang],
            loginUrl: `${siteURL(req)}/admin`,
            resetUrl: `${siteURL(req)}/admin/reset/${token}`,
          });
          if (!result.ok) req.payload.logger.warn(`Welcome email to ${doc.email} not sent: ${result.error}`);
        } catch (err) {
          req.payload.logger.error({ err, msg: "Welcome email failed" });
        }
        return doc;
      },
    ],
  },
  timestamps: true,
};
