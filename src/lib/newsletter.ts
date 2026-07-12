/**
 * Newsletter subscription handler — PLACEHOLDER.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ TODO: Connect a real email service here. This stub only simulates a     │
 * │ successful subscription so the UI flow works end-to-end.                │
 * │                                                                         │
 * │ Easiest options (pick one and replace the body of subscribeToNewsletter):│
 * │                                                                         │
 * │ 1) Formspree (no backend needed — works straight from the browser):     │
 * │    const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {     │
 * │      method: "POST",                                                    │
 * │      headers: { "Content-Type": "application/json", Accept: "application/json" }, │
 * │    body: JSON.stringify({ email }),                                   │
 * │    });                                                                  │
 * │    if (!res.ok) throw new Error("Subscription failed");                 │
 * │                                                                         │
 * │ 2) Resend Audiences / Mailchimp: needs a small server function so the   │
 * │    API key stays secret — add a TanStack Start server function (see     │
 * │    src/lib/api/example.functions.ts) that calls their API, then invoke  │
 * │    it from here.                                                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
export async function subscribeToNewsletter(email: string): Promise<void> {
  // Simulate network latency so the pending state is visible.
  await new Promise((resolve) => setTimeout(resolve, 600));

  // TODO: remove this log once a real provider is connected (see above).
  console.info("[newsletter] placeholder subscribe:", email);
}
