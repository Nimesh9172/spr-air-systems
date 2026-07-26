"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FileTextIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/core/Container";
import { RequestQuoteDialog } from "@/components/forms/RequestQuote";
import { buttonVariants } from "@/components/ui/button";
import { COMPANY } from "@/constants/company";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.6, ease: EASE_OUT } as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: ITEM_TRANSITION },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: ITEM_TRANSITION },
};

/**
 * About page bottom CTA — full-width blue banner.
 */
export function AboutCTA() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <section
      data-slot="about-cta"
      className="relative overflow-hidden bg-[oklch(0.32_0.1_255)] py-12 md:py-14"
    >
      {/* Decorative waves */}
      <svg
        aria-hidden
        viewBox="0 0 1440 120"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] w-full text-white/5"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        <path
          d="M-40 60C260 20 480 100 760 70s520-70 760-30"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M-40 90C280 50 500 120 780 90s520-60 720-20"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>

      <Container className="relative z-10">
        <motion.div
          className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="max-w-xl">
            <motion.h2
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              variants={item}
            >
              Let&apos;s Build the Right Solution
            </motion.h2>
            <motion.p
              className="mt-2 text-base text-white/70"
              variants={item}
            >
              Get in touch with our experts to discuss your compressed air
              requirements.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 lg:shrink-0"
            variants={item}
          >
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 cursor-pointer rounded-md bg-white px-5 text-sm font-semibold text-[oklch(0.32_0.1_255)] hover:bg-white/90",
              )}
            >
              <FileTextIcon className="size-4" aria-hidden />
              Request a Quote
            </button>

            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-md border-white/50 bg-transparent px-5 text-sm font-semibold text-white hover:bg-white/10 hover:text-white",
              )}
            >
              <PhoneIcon className="size-4" aria-hidden />
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      <RequestQuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </section>
  );
}
