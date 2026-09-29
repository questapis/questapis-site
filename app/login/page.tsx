import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Sign in | QuestAPIs" };
export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const query = await searchParams;
  const message = typeof query.message === "string" ? query.message : "";
  return <main id="main-content" className="shell auth-page"><section><p className="eyebrow">Welcome back</p><h1>Return to your adventure.</h1><p className="muted">Your Academy progress and API workspace live in one account.</p></section><AuthForm mode="login" initialMessage={message} /></main>;
}
