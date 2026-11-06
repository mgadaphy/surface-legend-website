/**
 * Resting email services that ran out, the same way lib/ai-providers.ts rests AI providers,
 * so the next email goes straight to a service that works.
 * Resend's error names: https://resend.com/docs/api-reference/errors (checked November 2026).
 */
export type RestReason = "daily" | "monthly" | "minute" | "credentials";
export type Failure = { status?: number; code?: string; text: string };
export type Verdict = { reason: RestReason | null; tryNext: boolean };

type Rest = { until: number; reason: RestReason };

// On globalThis because Next.js can load this file more than once in one server.
const store = globalThis as unknown as { __mgdEmailRests?: Map<string, Rest> };
const rests = (store.__mgdEmailRests ??= new Map<string, Rest>());

function nextUtcMidnight() {
  const d = new Date();
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1);
}

function nextUtcMonth() {
  const d = new Date();
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1);
}

const untilFor: Record<RestReason, () => number> = {
  daily: nextUtcMidnight,
  monthly: nextUtcMonth,
  minute: () => Date.now() + 60 * 1000,
  credentials: () => Date.now() + 60 * 60 * 1000,
};

/**
 * What a failure means. Daily or monthly limit: rest until it resets. Per-second limit or busy server: one minute.
 * Bad key or unverified sender: one hour. A bad message or recipient is not the service's fault, so no other
 * service is tried. Anything unclear tries the next service: a delivered enquiry matters more than a tidy log.
 */
export function judge(kind: "resend" | "smtp", f: Failure): Verdict {
  const text = f.text.toLowerCase();
  if (kind === "resend") {
    if (f.code === "daily_quota_exceeded") return { reason: "daily", tryNext: true };
    if (f.code === "monthly_quota_exceeded") return { reason: "monthly", tryNext: true };
    if (f.status === 429) return { reason: "minute", tryNext: true };
    if (f.status === 401 || f.status === 403 || text.includes("api key")) return { reason: "credentials", tryNext: true };
    if (f.status === 400 || f.status === 422) return { reason: null, tryNext: false };
    return { reason: "minute", tryNext: true };
  }
  if (/quota|limit|exceeded|too many/.test(text) && !/size/.test(text)) {
    if (/month/.test(text)) return { reason: "monthly", tryNext: true };
    if (/daily|per.?day|\bday\b/.test(text)) return { reason: "daily", tryNext: true };
    return { reason: "minute", tryNext: true };
  }
  if (f.code === "EAUTH" || f.status === 530 || f.status === 534 || f.status === 535) return { reason: "credentials", tryNext: true };
  if (f.status && f.status >= 500) {
    if (/recipient|mailbox|no such user|user unknown|does not exist|invalid address/.test(text)) return { reason: null, tryNext: false };
    return { reason: "credentials", tryNext: true };
  }
  return { reason: "minute", tryNext: true };
}

export function rest(id: string, reason: RestReason) {
  rests.set(id, { until: untilFor[reason](), reason });
}

export function restOf(id: string): Rest | null {
  const r = rests.get(id);
  if (!r) return null;
  if (r.until > Date.now()) return r;
  rests.delete(id);
  return null;
}

export function wake(id: string) {
  rests.delete(id);
}

/** After the settings change: a new key should be used at once. */
export function wakeAll() {
  rests.clear();
}
