import { describe, expect, it } from "vitest";
import { authFailureReason, authRedirectMessage, friendlyAuthError } from "./auth-errors";

describe("auth error messages", () => {
  it("replaces PKCE implementation details with browser guidance", () => {
    const raw = "PKCE code verifier not found in storage. For SSR frameworks use another client.";
    expect(authFailureReason(raw)).toBe("browser_changed");
    expect(authRedirectMessage("browser_changed")).toContain("different browser");
    expect(friendlyAuthError(new Error(raw), "login")).not.toContain("PKCE");
  });

  it("does not display arbitrary query-string content", () => {
    expect(authRedirectMessage("<script>alert(1)</script>")).toBe("");
  });

  it("uses task-specific safe messages for provider failures", () => {
    expect(friendlyAuthError(new Error("Error sending confirmation email"), "signup")).toContain("confirmation email");
    expect(friendlyAuthError(new Error("Invalid login credentials"), "login")).toBe("The email or password is incorrect.");
  });
});
