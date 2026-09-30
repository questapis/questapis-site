export type AuthFailureReason = "browser_changed" | "link_invalid" | "unavailable" | "auth_failed";

const redirectMessages: Record<AuthFailureReason, string> = {
  browser_changed: "This sign-in link was opened in a different browser or its browser data was cleared. Request a new link, then open it in the same browser where you started.",
  link_invalid: "This sign-in link is invalid or has expired. Request a new link and try again.",
  unavailable: "Sign-in is temporarily unavailable. Please try again in a few minutes.",
  auth_failed: "We couldn’t complete sign-in. Request a fresh link and try again.",
};

export function authFailureReason(message: string): AuthFailureReason {
  const normalized = message.toLowerCase();
  if (normalized.includes("pkce") || normalized.includes("code verifier") || normalized.includes("storage")) {
    return "browser_changed";
  }
  if (normalized.includes("expired") || normalized.includes("invalid token") || normalized.includes("otp") || normalized.includes("verification token")) {
    return "link_invalid";
  }
  if (normalized.includes("temporarily unavailable") || normalized.includes("failed to fetch") || normalized.includes("network")) {
    return "unavailable";
  }
  return "auth_failed";
}

export function authRedirectMessage(value: string | undefined): string {
  return value && value in redirectMessages ? redirectMessages[value as AuthFailureReason] : "";
}

export function friendlyAuthError(error: unknown, mode: "login" | "signup" | "reset"): string {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  if (message.includes("pkce") || message.includes("code verifier")) return redirectMessages.browser_changed;
  if (message.includes("invalid login credentials")) return "The email or password is incorrect.";
  if (message.includes("rate limit") || message.includes("email rate limit")) return "Please wait a minute before requesting another email.";
  if (message.includes("error sending confirmation email")) return "We couldn’t send the confirmation email. Please try again in a moment.";
  if (message.includes("expired") || message.includes("invalid token") || message.includes("otp")) return redirectMessages.link_invalid;
  if (mode === "signup") return "We couldn’t create your account. Please try again in a moment.";
  if (mode === "reset") return "We couldn’t send the reset link. Please try again in a moment.";
  return "We couldn’t sign you in. Check your details and try again.";
}
