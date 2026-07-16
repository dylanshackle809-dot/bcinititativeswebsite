import { createServerFn } from "@tanstack/react-start";
import process from "node:process";
import { z } from "zod";

// Real newsletter subscription — server-side so RESEND_API_KEY stays secret.
// Adds the email as a contact in Resend via their REST API (native fetch, no
// SDK needed). The subscriber's currently-tracked opportunity ids ride along
// as a custom contact property so the "Get Reminders / opportunities you're
// tracking" copy stays honest.
//
// Env (see .env.example): RESEND_API_KEY required; RESEND_AUDIENCE_ID optional.
// Read inside the handler (server-only, per-request) — never at module scope.
//
// ponytail: v1 — this only CAPTURES the tracked opportunity ids on the contact
// (properties.saved_opportunities). A proper deadline-triggered reminder email
// job (cron reading each contact's saved ids + opportunity deadlines) is the
// next step if reminders should actually send. Also: `saved_opportunities` may
// need to be created once as a custom property in the Resend dashboard, and if
// RESEND_AUDIENCE_ID is set we post to that audience's contacts endpoint.

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email(),
      savedIds: z.array(z.number()).default([]),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Newsletter is not configured (missing RESEND_API_KEY).");
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const endpoint = audienceId
      ? `https://api.resend.com/audiences/${audienceId}/contacts`
      : "https://api.resend.com/contacts";

    const body: Record<string, unknown> = { email: data.email, unsubscribed: false };
    if (data.savedIds.length) {
      body.properties = { saved_opportunities: data.savedIds.join(",") };
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend subscribe failed (${res.status}): ${detail}`);
    }

    return { ok: true as const };
  });
