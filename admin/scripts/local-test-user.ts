/** LOCAL DEVELOPMENT ONLY: create test accounts in the local Docker database. Never run against production. */
import { getPayload } from "payload";
import config from "../payload.config";

if (!process.env.DATABASE_URL?.includes("127.0.0.1:5435")) throw new Error("Refusing to run: not the local development database.");
const payload = await getPayload({ config });
const pass = process.env.LOCAL_TEST_PASSWORD!;
for (const [email, name, role] of [
  ["superadmin@local.test", "Local Super Admin", "superadmin"],
  ["editor@local.test", "Local Editor", "editor"],
] as const) {
  const found = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1, overrideAccess: true });
  if (!found.totalDocs) await payload.create({ collection: "users", overrideAccess: true, data: { email, name, role, password: pass } });
  payload.logger.info(`ready: ${email}`);
}
process.exit(0);
