import { createAdminClient } from "@/lib/supabase/admin";
import { apiError, requireUser } from "@/lib/server/responses";
import { assertTrustedOrigin, getSiteUrl, getStripe, StripeConfigurationError } from "@/lib/server/stripe";

export async function POST(request: Request) {
  if (!assertTrustedOrigin(request)) return apiError("FORBIDDEN", "The portal request origin is not allowed.", 403);
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const admin = createAdminClient();
  if (!admin) return apiError("SERVICE_UNAVAILABLE", "Billing persistence is not configured.", 503);
  const { data } = await admin.from("subscriptions").select("provider_customer_id").eq("user_id", auth.user.id).maybeSingle();
  if (!data?.provider_customer_id) return apiError("NO_BILLING_ACCOUNT", "No billing account is available yet.", 404);

  try {
    const stripe = getStripe();
    const customer = await stripe.customers.retrieve(data.provider_customer_id);
    if (customer.deleted || customer.livemode) return apiError("BILLING_ACCOUNT_INVALID", "The sandbox billing account is unavailable.", 409);
    const session = await stripe.billingPortal.sessions.create({ customer: customer.id, return_url: `${getSiteUrl()}/dashboard` });
    return Response.json({ url: session.url });
  } catch (error) {
    if (error instanceof StripeConfigurationError) return apiError("BILLING_NOT_CONFIGURED", error.message, 503);
    return apiError("PORTAL_FAILED", "The billing portal could not be opened.", 502);
  }
}
