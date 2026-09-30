import Link from "next/link";
import { redirect } from "next/navigation";
import { BillingAction } from "@/components/billing-action";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Checkout complete | QuestAPIs" };

export default async function BillingSuccessPage() {
  const supabase = await createClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (!data.user) redirect("/login?next=/billing/success");

  return <main id="main-content" className="shell standard-page narrow">
    <p className="eyebrow">Sandbox billing</p>
    <h1>Your test checkout is complete.</h1>
    <p className="page-lede">Stripe is confirming the subscription through a signed webhook. Paid access changes only after that server-to-server event is verified and saved.</p>
    <div className="notice"><strong>No live charge was created.</strong><p>This integration accepts Stripe test-mode credentials and test-mode events only.</p></div>
    <div className="actions"><Link className="button" href="/dashboard">Return to dashboard</Link><BillingAction action="portal">Manage test billing</BillingAction></div>
  </main>;
}
