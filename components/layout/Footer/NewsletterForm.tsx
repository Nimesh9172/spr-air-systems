"use client";

import { useState, type FormEvent } from "react";

import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  className?: string;
};

/**
 * Footer newsletter signup — stub submit until a mailing API is wired.
 */
export function NewsletterForm({ className }: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      // Wire to newsletter service later.
      await new Promise((resolve) => setTimeout(resolve, 400));
      event.currentTarget.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full max-w-md overflow-hidden rounded-md", className)}
      noValidate
    >
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Your email"
        className="h-11 min-w-0 flex-1 border border-white/15 border-r-0 bg-[#0a1220] px-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-[oklch(0.55_0.16_255)]"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 shrink-0 bg-[oklch(0.52_0.16_255)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[oklch(0.46_0.16_255)] disabled:opacity-70"
      >
        {isSubmitting ? "…" : "Join"}
      </button>
    </form>
  );
}
