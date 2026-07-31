import type { NextApiRequest } from 'next';

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 3;
const MAX_KEYS = 5000;

/**
 * Best-effort in-memory sliding window, keyed by client IP.
 *
 * On serverless this is per-instance and resets on cold start, so it will not
 * stop a distributed flood — it does stop the common case of one script
 * hammering the form, filling the inbox and burning the Resend quota. If a hard
 * guarantee is ever needed, swap this store for Vercel KV or Upstash.
 */
const buckets = new Map<string, number[]>();

export function clientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = raw?.split(',')[0]?.trim();
  return first || req.socket.remoteAddress || 'unknown';
}

export function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();

  // Crude ceiling so a spoofed-IP flood can't grow the map without bound.
  if (buckets.size > MAX_KEYS) buckets.clear();

  const hits = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (hits.length >= MAX_HITS) {
    buckets.set(key, hits);
    return { ok: false, retryAfter: Math.ceil((WINDOW_MS - (now - hits[0])) / 1000) };
  }

  hits.push(now);
  buckets.set(key, hits);
  return { ok: true, retryAfter: 0 };
}
