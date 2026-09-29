import { ResetPasswordForm } from "@/components/reset-password-form";
export const metadata = { title: "Choose a new password | QuestAPIs", robots: { index: false, follow: false } };
export default function ResetPage() { return <main id="main-content" className="shell auth-page"><section><p className="eyebrow">Account recovery</p><h1>Choose a new password.</h1><p className="muted">Use at least eight characters and do not reuse a password from another service.</p></section><ResetPasswordForm /></main>; }
