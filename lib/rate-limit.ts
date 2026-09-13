/**
 * In-memory sliding-window rate limiter for the enquiry API.
 * Enough to stop a flooded contact form on a single Node server.
 */

const hits = new Map<string, number[]>();
const MAX_KEYS = 5000;

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number };

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;
  const recent = (hits.get(key) ?? []).filter((time) => time > windowStart);

  if (recent.length >= limit) {
    hits.set(key, recent);
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((recent[0]! + windowMs - now) / 1000),
    );
    return { ok: false, retryAfterSeconds };
  }

  recent.push(now);
  hits.set(key, recent);
  pruneExpired(now);
  return { ok: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}

function pruneExpired(now: number) {
  if (hits.size < MAX_KEYS) return;

  for (const [key, times] of hits) {
    const fresh = times.filter((time) => now - time < 60 * 60 * 1000);
    if (fresh.length === 0) hits.delete(key);
    else hits.set(key, fresh);
  }
}
