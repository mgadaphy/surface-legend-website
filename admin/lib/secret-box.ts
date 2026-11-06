import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

/**
 * Encrypts secrets (API keys, SMTP passwords) before they are stored in the database.
 * The key is derived from PAYLOAD_SECRET, which lives only in the server's .env.
 */
const PREFIX = "enc:v1:";
const key = () => createHash("sha256").update(`sl-secret-box:${process.env.PAYLOAD_SECRET ?? ""}`).digest();

export const isSealed = (value: unknown): value is string => typeof value === "string" && value.startsWith(PREFIX);

export function seal(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return PREFIX + [iv, cipher.getAuthTag(), data].map((b) => b.toString("base64")).join(":");
}

export function unseal(value: string | null | undefined): string {
  if (!value) return "";
  if (!isSealed(value)) return value;
  try {
    const [iv, tag, data] = value.slice(PREFIX.length).split(":").map((p) => Buffer.from(p, "base64"));
    const decipher = createDecipheriv("aes-256-gcm", key(), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
  } catch {
    return ""; // PAYLOAD_SECRET changed: the secret must be entered again.
  }
}
