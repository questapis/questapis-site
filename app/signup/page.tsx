import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Create an account | QuestAPIs" };
export default function SignupPage() { return <main id="main-content" className="shell auth-page"><section><p className="eyebrow">Begin here</p><h1>Create your adventurer account.</h1><p className="muted">Learn from zero, save progress, and manage API access from one place.</p></section><AuthForm mode="signup" /></main>; }

