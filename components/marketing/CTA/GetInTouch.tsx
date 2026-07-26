"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRightIcon,
  Building2Icon,
  ChevronDownIcon,
  ListIcon,
  MailIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { Button } from "@/components/core/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY } from "@/constants/company";
import { cn } from "@/lib/utils";
import { submitContact } from "@/services/contact.service";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.6, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: ITEM_TRANSITION },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: ITEM_TRANSITION },
};

const REQUIREMENTS = [
  "Air Compressors",
  "Screw Compressors",
  "Pumps",
  "Service & Maintenance",
  "Custom System Design",
  "Request a Quote",
  "Other",
] as const;

const CONTACT_ROWS: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}[] = [
  {
    icon: MapPinIcon,
    label: "Headquarters",
    value: `${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.country}`,
  },
  {
    icon: PhoneIcon,
    label: "Sales & Enquiry",
    value: COMPANY.phone,
    href: `tel:${COMPANY.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MailIcon,
    label: "Email Support",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
  },
];

const fieldClassName =
  "h-11 rounded-xl border-border/70 bg-[oklch(0.985_0.005_250)] px-3.5 text-sm placeholder:text-muted-foreground/70 focus-visible:border-[oklch(0.52_0.16_255)] focus-visible:ring-[oklch(0.52_0.16_255)]/20";

/**
 * Homepage get-in-touch CTA — contact details + enquiry form.
 */
export function GetInTouch() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContact();
      event.currentTarget.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Section
      data-slot="get-in-touch"
      spacing="sm"
      className="relative overflow-hidden bg-white"
    >
      {/* Decorative flowing air-lines — bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px] [mask-image:linear-gradient(to_top,black_35%,transparent)]"
      >
        <svg
          viewBox="0 0 1440 280"
          className="h-full w-full text-[oklch(0.82_0.05_250)] opacity-50"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            d="M-40 120C260 40 480 220 760 150s520-160 760-80"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M-40 180C280 100 500 260 780 190s520-140 720-60"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.7"
          />
          <path
            d="M-40 70C240 10 460 180 740 120s540-140 780-70"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-20">
          {/* Left — copy + contact rows */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className="flex items-center gap-3 text-small font-semibold tracking-[0.16em] text-[oklch(0.52_0.16_255)] uppercase"
              variants={item}
            >
              <span
                className="h-px w-8 shrink-0"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              />
              Get in Touch
            </motion.p>

            <motion.h2
              className="mt-4 max-w-md text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
              variants={item}
            >
              Ready to Optimize Your{" "}
              <span className="text-[oklch(0.52_0.16_255)]">
                Compressed Air?
              </span>
            </motion.h2>

            <motion.p
              className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground"
              variants={item}
            >
              Consult with our specialist engineers today for a customized
              system design or to request a quote for your facility.
            </motion.p>

            <motion.div
              className="mt-6 h-px w-12"
              style={{ backgroundColor: ACCENT }}
              variants={item}
              aria-hidden
            />

            <motion.ul className="mt-8 flex flex-col gap-5" variants={item}>
              {CONTACT_ROWS.map((row) => {
                const Icon = row.icon;
                const value = row.href ? (
                  <a
                    href={row.href}
                    className="text-sm leading-relaxed text-muted-foreground outline-none transition-colors hover:text-[oklch(0.52_0.16_255)] focus-visible:text-[oklch(0.52_0.16_255)]"
                  >
                    {row.value}
                  </a>
                ) : (
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {row.value}
                  </span>
                );

                return (
                  <li key={row.label} className="flex items-start gap-3.5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]">
                      <Icon className="size-5" aria-hidden strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm font-semibold text-foreground">
                        {row.label}
                      </p>
                      <div className="mt-0.5">{value}</div>
                    </div>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>

          {/* Right — enquiry form card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border/60 bg-white p-6 shadow-[0_16px_48px_-20px_oklch(0.26_0.09_260_/_28%)] sm:p-8"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="full-name"
                  label="Full Name"
                  icon={UserIcon}
                  required
                >
                  <Input
                    id="full-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    required
                    className={fieldClassName}
                  />
                </Field>

                <Field
                  id="company"
                  label="Company"
                  icon={Building2Icon}
                  required
                >
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Industries Ltd"
                    required
                    className={fieldClassName}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field
                  id="work-email"
                  label="Work Email"
                  icon={MailIcon}
                  required
                >
                  <Input
                    id="work-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="john@company.com"
                    required
                    className={fieldClassName}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field
                  id="requirement"
                  label="Requirement"
                  icon={ListIcon}
                  required
                >
                  <div className="relative">
                    <select
                      id="requirement"
                      name="requirement"
                      required
                      defaultValue=""
                      className={cn(
                        fieldClassName,
                        "w-full appearance-none pr-10 text-foreground outline-none transition-colors focus-visible:border-[oklch(0.52_0.16_255)] focus-visible:ring-3 focus-visible:ring-[oklch(0.52_0.16_255)]/20",
                        "[&:invalid]:text-muted-foreground/70",
                      )}
                    >
                      <option value="" disabled>
                        Select Requirement
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
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <Field id="message" label="Message" icon={PencilIcon}>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    className={cn(
                      fieldClassName,
                      "min-h-[7.5rem] resize-y py-3",
                    )}
                  />
                </Field>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="mt-6 h-12 w-full justify-between rounded-md bg-[oklch(0.42_0.14_255)] px-5 text-base font-semibold text-white hover:bg-[oklch(0.38_0.14_255)]"
              >
                <span className="text-white align-middle text-center w-full">{isSubmitting ? "Submitting…" : "Submit Enquiry"}</span>
                <ArrowRightIcon className="size-4" aria-hidden />
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

function Field({
  id,
  label,
  icon: Icon,
  required,
  children,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground"
      >
        <Icon
          className="size-3.5 text-[oklch(0.52_0.16_255)]"
          aria-hidden
          strokeWidth={2}
        />
        {label}
        {required ? (
          <span className="text-[oklch(0.52_0.16_255)]" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}
