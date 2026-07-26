"use client";

import {
  AwardIcon,
  Building2Icon,
  ChevronDownIcon,
  FileTextIcon,
  HeadsetIcon,
  ListIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  SendIcon,
  ShieldCheckIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";
import { useState, type FormEvent, type ReactElement, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { submitContact } from "@/services/contact.service";

const ACCENT = "oklch(0.52 0.16 255)";

const REQUIREMENTS = [
  "Air Compressors",
  "Screw Compressors",
  "Pumps",
  "Service & Maintenance",
  "Custom System Design",
  "Other",
] as const;

const WHY_CHOOSE: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheckIcon, label: "Trusted by 500+ Global Clients" },
  { icon: AwardIcon, label: "25+ Years of Industry Experience" },
  { icon: HeadsetIcon, label: "Expert Support 24/7" },
];

const inputClassName =
  "h-11 w-full min-w-0 rounded-lg border border-border/70 bg-white pr-3.5 pl-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-[oklch(0.52_0.16_255)] focus-visible:ring-3 focus-visible:ring-[oklch(0.52_0.16_255)]/20";

type RequestQuoteDialogProps = {
  /** Element used to open the dialog (button, link-styled button, etc.). */
  trigger?: ReactElement<Record<string, unknown>>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/**
 * "Request a Quote" modal — info panel + enquiry form.
 * Render with a `trigger`, or control it via `open`/`onOpenChange`.
 */
export function RequestQuoteDialog({
  trigger,
  open,
  onOpenChange,
}: RequestQuoteDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContact();
      event.currentTarget.reset();
      onOpenChange?.(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger render={trigger} /> : null}

      <DialogContent
        className="block max-h-[92vh] w-full max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-2xl bg-white p-2.5 sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
        showCloseButton
      >
        <DialogTitle className="sr-only">Request a Quote</DialogTitle>
        <DialogDescription className="sr-only">
          Share your requirements with us and our experts will get back to you
          with the best solution and pricing.
        </DialogDescription>

        <div className="grid lg:grid-cols-[17rem_1fr] xl:grid-cols-[19rem_1fr]">
          {/* Left — info panel */}
          <aside className="relative hidden overflow-hidden rounded-xl bg-[oklch(0.97_0.01_250)] p-7 lg:block">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-[oklch(0.93_0.03_250)] text-[oklch(0.5_0.16_255)]">
              <FileTextIcon className="size-7" aria-hidden strokeWidth={1.5} />
            </span>

            <p
              aria-hidden
              className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight text-foreground"
            >
              Request a{" "}
              <span className="text-[oklch(0.52_0.16_255)]">Quote</span>
            </p>

            <div
              className="mt-4 h-0.5 w-10 rounded-full"
              style={{ backgroundColor: ACCENT }}
              aria-hidden
            />

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Share your requirements with us and our experts will get back to
              you with the best solution and pricing.
            </p>

            <div className="mt-6 border-t border-border/70 pt-6">
              <p className="text-sm font-bold text-foreground">
                Why Choose SPR Air Systems?
              </p>
              <ul className="mt-5 flex flex-col gap-4">
                {WHY_CHOOSE.map((row) => {
                  const Icon = row.icon;
                  return (
                    <li key={row.label} className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[oklch(0.85_0.04_250)] bg-white text-[oklch(0.5_0.16_255)]">
                        <Icon
                          className="size-4.5"
                          aria-hidden
                          strokeWidth={1.75}
                        />
                      </span>
                      <span className="text-sm leading-snug text-muted-foreground">
                        {row.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Decorative waves — bottom */}
            <svg
              aria-hidden
              viewBox="0 0 300 140"
              className="pointer-events-none absolute -bottom-2 left-0 w-full text-[oklch(0.86_0.04_250)] opacity-60"
              preserveAspectRatio="xMidYMax slice"
              fill="none"
            >
              <path
                d="M-10 90c60-40 120 40 180 0s90-50 140-20M-10 110c60-40 120 40 180 0s90-50 140-20M-10 130c60-40 120 40 180 0s90-50 140-20"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </aside>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            className="min-w-0 p-4 pt-10 sm:p-6 sm:pt-10 lg:p-7"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <QuoteField id="quote-name" label="Full Name" required>
                <IconInput icon={UserIcon}>
                  <input
                    id="quote-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    required
                    className={inputClassName}
                  />
                </IconInput>
              </QuoteField>

              <QuoteField id="quote-company" label="Company Name" required>
                <IconInput icon={Building2Icon}>
                  <input
                    id="quote-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Enter your company name"
                    required
                    className={inputClassName}
                  />
                </IconInput>
              </QuoteField>

              <QuoteField id="quote-email" label="Email Address" required>
                <IconInput icon={MailIcon}>
                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    required
                    className={inputClassName}
                  />
                </IconInput>
              </QuoteField>

              <QuoteField id="quote-phone" label="Phone Number" required>
                <IconInput icon={PhoneIcon}>
                  <input
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                    required
                    className={inputClassName}
                  />
                </IconInput>
              </QuoteField>
            </div>

            <div className="mt-4">
              <QuoteField
                id="quote-requirement"
                label="Requirement / Application"
                required
              >
                <IconInput icon={ListIcon}>
                  <select
                    id="quote-requirement"
                    name="requirement"
                    required
                    defaultValue=""
                    className={cn(
                      inputClassName,
                      "appearance-none pr-10 [&:invalid]:text-muted-foreground/70",
                    )}
                  >
                    <option value="" disabled>
                      Select your requirement
                    </option>
                    {REQUIREMENTS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                </IconInput>
              </QuoteField>
            </div>

            <div className="mt-4">
              <QuoteField id="quote-location" label="Project Location">
                <IconInput icon={MapPinIcon}>
                  <input
                    id="quote-location"
                    name="location"
                    type="text"
                    placeholder="Enter project location"
                    className={inputClassName}
                  />
                </IconInput>
              </QuoteField>
            </div>

            <div className="mt-4">
              <QuoteField id="quote-message" label="Message / Additional Details">
                <IconInput icon={PencilIcon} iconClassName="top-3.5 -translate-y-0">
                  <textarea
                    id="quote-message"
                    name="message"
                    rows={3}
                    placeholder="Tell us more about your requirement..."
                    className={cn(
                      inputClassName,
                      "h-auto min-h-[5.5rem] resize-y py-3",
                    )}
                  />
                </IconInput>
              </QuoteField>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[oklch(0.52_0.16_255)] text-base font-semibold text-white transition-colors hover:bg-[oklch(0.46_0.16_255)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[oklch(0.52_0.16_255)]/30 disabled:opacity-70"
            >
              <SendIcon className="size-4" aria-hidden />
              {isSubmitting ? "Submitting…" : "Submit Request"}
            </button>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <LockIcon className="size-3.5 shrink-0" aria-hidden />
              Your information is safe with us. We never share your details.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function QuoteField({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
        {required ? (
          <span className="ml-1 text-destructive" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}

function IconInput({
  icon: Icon,
  iconClassName,
  children,
}: {
  icon: LucideIcon;
  iconClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <Icon
        className={cn(
          "pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[oklch(0.6_0.12_255)]",
          iconClassName,
        )}
        aria-hidden
        strokeWidth={1.75}
      />
      {children}
    </div>
  );
}
