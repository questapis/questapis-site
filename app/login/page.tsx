import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Sign in | QuestAPIs" };
export default function LoginPage() { return <main id="main-content" className="shell auth-page"><section><p className="eyebrow">Welcome back</p><h1>Return to your adventure.</h1><p className="muted">Your Academy progress and API workspace live in one account.</p></section><AuthForm mode="login" /></main>; }

