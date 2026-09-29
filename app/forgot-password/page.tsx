import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Reset password | QuestAPIs" };
export default function ForgotPasswordPage() { return <main id="main-content" className="shell auth-page"><section><p className="eyebrow">Account recovery</p><h1>Find your way back.</h1><p className="muted">Enter your account email. For privacy, the response is the same whether or not an account exists.</p></section><AuthForm mode="reset" /></main>; }
