"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRightIcon, FileTextIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/core/Container";
import { RequestQuoteDialog } from "@/components/forms/RequestQuote";
import { buttonVariants } from "@/components/ui/button";
import { solutionValues } from "@/data/solutions";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.6, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
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
 * Solutions page hero — catalogue headline with quote and product CTAs.
 */
export function SolutionsHero() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <section
      data-slot="solutions-hero"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,oklch(0.97_0.02_250)_0%,oklch(0.985_0.01_250)_42%,oklch(0.96_0.035_250)_100%)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 size-[28rem] rounded-full bg-[oklch(0.78_0.08_250_/_0.35)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 left-1/4 size-[22rem] rounded-full bg-[oklch(0.82_0.06_250_/_0.28)] blur-3xl"
      />

      <Container className="relative z-10 py-10 md:py-12 lg:py-14">
        <motion.div
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-2xl">
            <motion.p
              className="flex items-center gap-3 text-small font-semibold tracking-[0.16em] text-[oklch(0.52_0.16_255)] uppercase"
              variants={item}
            >
              <span
                className="h-px w-8 shrink-0"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              />
              Product Catalogue
            </motion.p>

            <motion.h1
              className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
              variants={item}
            >
              Complete Solutions for{" "}
              <span className="text-[oklch(0.52_0.16_255)]">
                Compressed Air Systems.
              </span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
              variants={item}
            >
              Engineering air, empowering industry. Reciprocating and screw
              compressors, dryers, filters, PPR piping, and genuine service
              support — specified as one system from the compressor room to the
              farthest tool.
            </motion.p>

            <motion.ul className="mt-6 flex flex-wrap gap-2" variants={item}>
              {solutionValues.map((value) => (
                <li
                  key={value}
                  className="rounded-full border border-[oklch(0.82_0.05_250)] bg-white px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-[oklch(0.42_0.12_255)]"
                >
                  {value}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3 lg:shrink-0 lg:pb-1"
          >
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 cursor-pointer rounded-md bg-[oklch(0.52_0.16_255)] px-5 text-sm font-semibold text-white hover:bg-[oklch(0.46_0.16_255)]",
              )}
            >
              <FileTextIcon className="size-4" aria-hidden />
              Request Quote
            </button>
            <Link
              href="/products"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 cursor-pointer rounded-md border-[oklch(0.52_0.16_255)] bg-white px-5 text-sm font-semibold text-[oklch(0.52_0.16_255)] hover:bg-[oklch(0.96_0.02_250)] hover:text-[oklch(0.46_0.16_255)]",
              )}
            >
              Explore Products
              <ArrowRightIcon className="size-4" aria-hidden />
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      <RequestQuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </section>
  );
}
