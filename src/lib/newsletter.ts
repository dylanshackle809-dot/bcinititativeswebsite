import { subscribeNewsletter } from "@/lib/api/newsletter.functions";

/**
 * Newsletter subscription handler.
 *
 * Calls the server function (src/lib/api/newsletter.functions.ts) which adds
 * the email as a Resend contact. Throws on failure — the caller
 * (NewsletterSignup.tsx) shows the error state and only shows success once this
 * resolves. Needs RESEND_API_KEY set (see .env.example); without it the server
 * function throws and the UI shows the generic error.
 *
 * `savedIds` are the opportunities the user is currently tracking (from
 * useSavedOpportunities) — passed through so reminders can reference them.
 */
export async function subscribeToNewsletter(email: string, savedIds: number[] = []): Promise<void> {
  await subscribeNewsletter({ data: { email, savedIds } });
}
