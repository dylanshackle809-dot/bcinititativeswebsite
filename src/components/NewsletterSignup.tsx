import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, CheckCircle2 } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/newsletter";

const schema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("That doesn't look like a valid email."),
});

type FormValues = z.infer<typeof schema>;

/**
 * Newsletter email-capture band shown above the footer.
 * Validation via zod + react-hook-form; submission goes through the
 * placeholder handler in src/lib/newsletter.ts (see the TODO there for
 * connecting Resend / Mailchimp / Formspree).
 */
export function NewsletterSignup() {
  const [subscribed, setSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async ({ email }: FormValues) => {
    try {
      await subscribeToNewsletter(email);
      setSubscribed(true);
    } catch {
      setError("email", { message: "Something went wrong — please try again." });
    }
  };

  return (
    <section className="newsletter-band" id="newsletter" aria-label="Newsletter signup">
      <div className="newsletter-card">
        {subscribed ? (
          <div className="newsletter-success" role="status">
            <CheckCircle2 size={28} strokeWidth={1.8} />
            <h3>You're on the list!</h3>
            <p>We'll email you when opportunities are about to close. No spam, ever.</p>
          </div>
        ) : (
          <>
            <div className="newsletter-copy">
              <h3 className="newsletter-title">Get opportunities closing soon, straight to your inbox</h3>
              <p className="newsletter-sub">A short email when deadlines approach. No spam, unsubscribe anytime.</p>
            </div>
            <form className="newsletter-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="newsletter-field">
                <span className="newsletter-icon"><Mail size={16} strokeWidth={1.8} /></span>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="you@school.ca"
                  autoComplete="email"
                  aria-label="Email address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "newsletter-error" : undefined}
                  {...register("email")}
                />
              </div>
              <button type="submit" className="newsletter-btn" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing…" : "Subscribe"}
              </button>
              {errors.email && (
                <p className="newsletter-error" id="newsletter-error" role="alert">
                  {errors.email.message}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </section>
  );
}
