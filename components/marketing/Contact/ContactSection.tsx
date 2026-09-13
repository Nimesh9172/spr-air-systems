"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Building2Icon,
  ChevronDownIcon,
  ClockIcon,
  CloudUploadIcon,
  ListIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  SendIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY } from "@/constants/company";
import { ENQUIRY_INTERESTS } from "@/constants/enquiry";
import { cn } from "@/lib/utils";
import {
  getEnquiryErrorMessage,
  submitContact,
} from "@/services/contact.service";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.6, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ".pdf,.doc,.docx,.jpg,.jpeg";

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

const CONTACT_BLOCKS: {
  icon: LucideIcon;
  title: string;
  lines: { text: string; href?: string; accent?: boolean }[];
}[] = [
  {
    icon: PhoneIcon,
    title: "Call Us",
    lines: [
      {
        text: COMPANY.phone,
        href: `tel:${COMPANY.phone.replace(/\s/g, "")}`,
      },
      { text: "Mon – Sat, 9:00 AM – 6:00 PM" },
    ],
  },
  {
    icon: MailIcon,
    title: "Email Us",
    lines: COMPANY.emails.map((email) => ({
      text: email,
      href: `mailto:${email}`,
    })),
  },
  {
    icon: MapPinIcon,
    title: "Our Office",
    lines: COMPANY.address.lines.map((text) => ({ text })),
  },
  {
    icon: ClockIcon,
    title: "Working Hours",
    lines: [
      { text: "24/7 Support Available", accent: true },
      { text: "For existing clients" },
    ],
  },
];

const inputClassName =
  "h-11 w-full min-w-0 rounded-lg border border-border/70 bg-white pr-3.5 pl-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-[oklch(0.52_0.16_255)] focus-visible:ring-3 focus-visible:ring-[oklch(0.52_0.16_255)]/20";

/**
 * Contact page body — details column + enquiry form.
 */
export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function applyFile(file: File | undefined) {
    if (!file) {
      setFileName(null);
      setFileError(null);
      return;
    }

    if (file.size > MAX_FILE_BYTES) {
      setFileName(null);
      setFileError("File must be 5MB or smaller.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFileName(file.name);
    setFileError(null);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    applyFile(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (!file || !fileInputRef.current) return;

    const transfer = new DataTransfer();
    transfer.items.add(file);
    fileInputRef.current.files = transfer.files;
    applyFile(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    setIsSubmitting(true);
    try {
      await submitContact(new FormData(form), "Contact Page");
      form.reset();
      setFileName(null);
      setFileError(null);
      toast.success(
        "Thank you. Your enquiry has been sent. Our team will get back to you within 24 hours.",
      );
    } catch (error) {
      toast.error(getEnquiryErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Section
      data-slot="contact-section"
      spacing="sm"
      className="relative overflow-hidden bg-[oklch(0.975_0.008_250)]"
    >
      <Container className="relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:gap-16">
          {/* Left — Get in Touch */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h2
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              variants={item}
            >
              Get in Touch
            </motion.h2>
            <motion.div
              className="mt-3 h-0.5 w-10 rounded-full"
              style={{ backgroundColor: ACCENT }}
              variants={item}
              aria-hidden
            />
            <motion.p
              className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground"
              variants={item}
            >
              We are here to help you with the best compressed air solutions.
            </motion.p>

            <motion.ul className="mt-8 flex flex-col gap-5" variants={item}>
              {CONTACT_BLOCKS.map((block) => {
                const Icon = block.icon;
                return (
                  <li key={block.title} className="flex items-start gap-3.5">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[oklch(0.85_0.04_250)] bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]">
                      <Icon
                        className="size-5"
                        aria-hidden
                        strokeWidth={1.75}
                      />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm font-semibold text-foreground">
                        {block.title}
                      </p>
                      <div className="mt-1 flex flex-col gap-0.5">
                        {block.lines.map((line) =>
                          line.href ? (
                            <a
                              key={line.text}
                              href={line.href}
                              className={cn(
                                "text-sm leading-relaxed outline-none transition-colors hover:text-[oklch(0.52_0.16_255)] focus-visible:text-[oklch(0.52_0.16_255)]",
                                line.accent
                                  ? "font-medium text-[oklch(0.52_0.16_255)]"
                                  : "text-muted-foreground",
                              )}
                            >
                              {line.text}
                            </a>
                          ) : (
                            <span
                              key={line.text}
                              className={cn(
                                "text-sm leading-relaxed",
                                line.accent
                                  ? "font-medium text-[oklch(0.52_0.16_255)]"
                                  : "text-muted-foreground",
                              )}
                            >
                              {line.text}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border/60 bg-white p-6 shadow-[0_16px_48px_-20px_oklch(0.26_0.09_260_/_28%)] sm:p-8"
              noValidate
            >
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Send Us a Message
              </h2>
              <div
                className="mt-3 h-0.5 w-10 rounded-full"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field id="contact-name" label="Full Name" required>
                  <IconInput icon={UserIcon}>
                    <Input
                      id="contact-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      required
                      className={inputClassName}
                    />
                  </IconInput>
                </Field>

                <Field id="contact-company" label="Company Name" required>
                  <IconInput icon={Building2Icon}>
                    <Input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Enter your company name"
                      required
                      className={inputClassName}
                    />
                  </IconInput>
                </Field>

                <Field id="contact-email" label="Email Address" required>
                  <IconInput icon={MailIcon}>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email address"
                      required
                      className={inputClassName}
                    />
                  </IconInput>
                </Field>

                <Field id="contact-phone" label="Phone Number" required>
                  <IconInput icon={PhoneIcon}>
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Enter your phone number"
                      required
                      className={inputClassName}
                    />
                  </IconInput>
                </Field>

                <Field id="contact-interest" label="Product / Service Interest">
                  <IconInput icon={ListIcon}>
                    <select
                      id="contact-interest"
                      name="interest"
                      defaultValue=""
                      className={cn(
                        inputClassName,
                        "appearance-none pr-10 [&:invalid]:text-muted-foreground/70",
                      )}
                    >
                      <option value="" disabled>
                        Select interest
                      </option>
                      {ENQUIRY_INTERESTS.map((option) => (
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
                </Field>

                <Field id="contact-location" label="Project Location">
                  <IconInput icon={MapPinIcon}>
                    <Input
                      id="contact-location"
                      name="location"
                      type="text"
                      placeholder="Enter project location"
                      className={inputClassName}
                    />
                  </IconInput>
                </Field>
              </div>

              <div className="mt-4">
                <Field
                  id="contact-message"
                  label="Message / Requirements"
                  required
                >
                  <IconInput
                    icon={PencilIcon}
                    iconClassName="top-3.5 -translate-y-0"
                  >
                    <Textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      required
                      className={cn(
                        inputClassName,
                        "h-auto min-h-[7rem] resize-y py-3",
                      )}
                    />
                  </IconInput>
                </Field>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-file"
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={cn(
                    "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition-colors",
                    isDragging
                      ? "border-[oklch(0.52_0.16_255)] bg-[oklch(0.96_0.02_250)]"
                      : "border-border/80 bg-[oklch(0.985_0.005_250)] hover:border-[oklch(0.72_0.08_250)] hover:bg-[oklch(0.97_0.01_250)]",
                  )}
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]">
                    <CloudUploadIcon
                      className="size-5"
                      aria-hidden
                      strokeWidth={1.75}
                    />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {fileName ?? "Click to upload or drag & drop files here"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PDF, DOC, DOCX or JPG (Max. 5MB)
                  </span>
                  <input
                    ref={fileInputRef}
                    id="contact-file"
                    name="attachment"
                    type="file"
                    accept={ACCEPTED_TYPES}
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                {fileError ? (
                  <p className="mt-2 text-xs text-destructive" role="alert">
                    {fileError}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[oklch(0.52_0.16_255)] text-base font-semibold text-white transition-colors hover:bg-[oklch(0.46_0.16_255)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[oklch(0.52_0.16_255)]/30 disabled:opacity-70"
              >
                <SendIcon className="size-4" aria-hidden />
                {isSubmitting ? "Submitting…" : "Submit Enquiry"}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <LockIcon className="size-3.5 shrink-0" aria-hidden />
                Your information is safe with us. We never share your details.
              </p>
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
