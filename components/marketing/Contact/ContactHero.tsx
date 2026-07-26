"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FileTextIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Container } from "@/components/core/Container";
import { RequestQuoteDialog } from "@/components/forms/RequestQuote";
import { buttonVariants } from "@/components/ui/button";
import { COMPANY } from "@/constants/company";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.68, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

/**
 * Contact page hero — industrial imagery fading into light copy on the left.
 */
export function ContactHero() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <section
      data-slot="contact-hero"
      className="relative isolate overflow-hidden bg-white"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={prefersReducedMotion ? false : { scale: 1.08 }}
        animate={prefersReducedMotion ? undefined : { scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        <Image
          src="/images/contact_us_hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-center"
        />
      </motion.div>

      {/* Left fade — text legibility without washing the image */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,oklch(1_0_0_/_90%)_0%,oklch(1_0_0_/_72%)_22%,oklch(1_0_0_/_32%)_44%,oklch(1_0_0_/_8%)_62%,transparent_78%)]"
      />
      <Container className="relative z-10 py-16 md:py-20 lg:py-24">
        <motion.div
          className="max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
            Contact Us
          </motion.p>

          <motion.h1
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            variants={item}
          >
            Let&apos;s Build the Right{" "}
            <span className="text-[oklch(0.52_0.16_255)]">
              Compressed Air Solution
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
            variants={item}
          >
            Talk to our experts and get customized solutions designed for your
            industry and application.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <motion.div variants={item}>
              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 cursor-pointer rounded-md bg-[oklch(0.52_0.16_255)] px-5 text-sm font-semibold text-white hover:bg-[oklch(0.46_0.16_255)]",
                )}
              >
                <FileTextIcon className="size-4" aria-hidden />
                Request a Quote
              </button>
            </motion.div>
            <motion.div variants={item}>
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-md border-[oklch(0.52_0.16_255)] bg-white/80 px-5 text-sm font-semibold text-[oklch(0.52_0.16_255)] backdrop-blur-sm hover:bg-[oklch(0.96_0.02_250)] hover:text-[oklch(0.46_0.16_255)]",
                )}
              >
                <PhoneIcon className="size-4" aria-hidden />
                Call Us
              </a>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      <RequestQuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </section>
  );
}
