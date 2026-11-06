import type { Payload } from "payload";
import { seedEmailTemplates } from "./email-templates";
import { importSiteContent } from "./site-content";

const STEPS = {
  emailTemplates: (payload: Payload) => seedEmailTemplates(payload),
  siteContent: (payload: Payload) => importSiteContent(payload),
} as const;

/**
 * One-time imports of the content that used to be built into the website.
 * Runs when the site starts, after all migrations, so every table exists whatever the
 * database's age. Each step runs once; its flag then stays set.
 */
export async function runSetup(payload: Payload) {
  if (process.env.NEXT_PHASE === "phase-production-build") return;
  try {
    const state = (await payload.findGlobal({ slug: "setup-state", overrideAccess: true, depth: 0 })) as unknown as Record<string, unknown>;
    for (const [key, step] of Object.entries(STEPS)) {
      if (state[key]) continue;
      const result = await step(payload);
      await payload.updateGlobal({ slug: "setup-state", data: { [key]: true }, overrideAccess: true });
      payload.logger.info(`[setup] ${key} imported: ${JSON.stringify(result ?? "done")}`);
    }
  } catch (err) {
    // Never stop the site from starting; the step is retried on the next start.
    payload.logger.error({ err, msg: "[setup] one-time import failed" });
  }
}
