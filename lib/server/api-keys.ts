import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export const API_KEY_PREFIX = "qapi_live_";

export function createApiKey() {
  const secret = randomBytes(24).toString("base64url");
  const rawKey = `${API_KEY_PREFIX}${secret}`;
  return {
    rawKey,
    prefix: rawKey.slice(0, API_KEY_PREFIX.length + 6),
    hash: hashApiKey(rawKey),
  };
}

export function hashApiKey(rawKey: string) {
  return createHash("sha256").update(rawKey, "utf8").digest("hex");
}

export function hashesMatch(leftHex: string, rightHex: string) {
  if (!/^[a-f0-9]{64}$/i.test(leftHex) || !/^[a-f0-9]{64}$/i.test(rightHex)) return false;
  const left = Buffer.from(leftHex, "hex");
  const right = Buffer.from(rightHex, "hex");
  return timingSafeEqual(left, right);
}

