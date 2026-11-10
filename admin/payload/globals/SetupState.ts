import type { GlobalConfig } from "payload";
import { isSuperAdmin } from "../access";

/**
 * Remembers which one-time imports have run (see payload/seed/run.ts), so content
 * an editor later deletes is never imported again. Hidden from the admin menu.
 */
export const SetupState: GlobalConfig = {
  slug: "setup-state",
  admin: { hidden: true, hideAPIURL: true },
  access: { read: ({ req }) => isSuperAdmin(req), update: () => false },
  fields: [
    { name: "emailTemplates", type: "checkbox", defaultValue: false },
    { name: "articles", type: "checkbox", defaultValue: false },
    { name: "siteContent", type: "checkbox", defaultValue: false },
  ],
};
