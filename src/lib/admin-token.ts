export const ADMIN_COOKIE = "syncloth_admin";

function encoder(): TextEncoder {
  return new TextEncoder();
}

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i];
  return d === 0;
}

export async function signAdminSession(secret: string): Promise<string> {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ exp });
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder().encode(payload),
  );
  const p = toBase64Url(encoder().encode(payload));
  const s = toBase64Url(new Uint8Array(sig));
  return `${p}.${s}`;
}

export async function verifyAdminSession(
  token: string,
  secret: string,
): Promise<boolean> {
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const p64 = token.slice(0, dot);
  const s64 = token.slice(dot + 1);
  try {
    const payloadBytes = fromBase64Url(p64);
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as {
      exp?: number;
    };
    if (typeof payload.exp !== "number" || payload.exp < Date.now())
      return false;
    const key = await hmacKey(secret);
    const payloadBuffer = payloadBytes.buffer.slice(
      payloadBytes.byteOffset,
      payloadBytes.byteOffset + payloadBytes.byteLength,
    ) as ArrayBuffer;
    const expected = new Uint8Array(
      await crypto.subtle.sign("HMAC", key, payloadBuffer),
    );
    const actual = fromBase64Url(s64);
    return timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

export function verifyAdminPassword(
  input: string,
  expected: string | undefined,
): boolean {
  if (!expected || expected.length === 0) return false;
  return timingSafeEqualStr(input, expected);
}
