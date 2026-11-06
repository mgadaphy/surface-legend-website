import type { Payload, PayloadRequest } from "payload";
import { DEFAULT_TEMPLATES, TEMPLATE_INFO, type TemplateKey } from "../../lib/email/defaults";

/** Creates the editable email templates (English and French) that do not exist yet. */
export async function seedEmailTemplates(payload: Payload, req?: Partial<PayloadRequest>) {
  let created = 0;
  for (const key of Object.keys(DEFAULT_TEMPLATES) as TemplateKey[]) {
    const existing = await payload.find({ collection: "email-templates", where: { key: { equals: key } }, limit: 1, depth: 0, overrideAccess: true, req });
    if (existing.totalDocs) continue;
    const { en, fr } = DEFAULT_TEMPLATES[key];
    const doc = await payload.create({
      collection: "email-templates",
      locale: "en",
      data: { key, name: TEMPLATE_INFO[key].label.en, ...en },
      overrideAccess: true,
      req,
    });
    await payload.update({ collection: "email-templates", id: doc.id, locale: "fr", data: { ...fr }, overrideAccess: true, req });
    created++;
  }
  return created;
}
