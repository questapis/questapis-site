import { describe, expect, it } from "vitest";
import { API_KEY_PREFIX, createApiKey, hashApiKey, hashesMatch } from "./api-keys";

describe("API key handling", () => {
  it("returns a raw key once and a one-way hash for storage", () => {
    const key = createApiKey();
    expect(key.rawKey).toMatch(new RegExp(`^${API_KEY_PREFIX}`));
    expect(key.hash).toHaveLength(64);
    expect(key.hash).not.toContain(key.rawKey);
    expect(key.prefix).not.toBe(key.rawKey);
    expect(hashApiKey(key.rawKey)).toBe(key.hash);
  });

  it("compares only valid fixed-length hashes", () => {
    const hash = hashApiKey("one-time-secret");
    expect(hashesMatch(hash, hash)).toBe(true);
    expect(hashesMatch(hash, hashApiKey("different"))).toBe(false);
    expect(hashesMatch(hash, "invalid")).toBe(false);
  });
});

