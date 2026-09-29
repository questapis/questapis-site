import { afterEach, describe, expect, it, vi } from "vitest";
import { logServerEvent } from "./logger";

afterEach(() => vi.restoreAllMocks());

describe("structured logging", () => {
  it("redacts nested credentials while preserving useful context", () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => undefined);
    logServerEvent("info", "test.event", {
      route: "grove",
      authorization: "Bearer secret",
      nested: { apiKey: "raw-key", code: "EXPECTED_CODE" },
    });
    const record = JSON.parse(String(info.mock.calls[0][0]));
    expect(record.authorization).toBe("[REDACTED]");
    expect(record.nested.apiKey).toBe("[REDACTED]");
    expect(record.nested.code).toBe("EXPECTED_CODE");
  });
});

