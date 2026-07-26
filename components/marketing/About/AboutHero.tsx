"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRightIcon, FileTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/core/Container";
import { RequestQuoteDialog } from "@/components/forms/RequestQuote";
import { buttonVariants } from "@/components/ui/button";
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
 * About Us page hero — headline, sub-copy, CTAs, industrial image on the right.
 */
export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <section
      data-slot="about-hero"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* Full-bleed background image */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={prefersReducedMotion ? false : { scale: 1.06 }}
        animate={prefersReducedMotion ? undefined : { scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] sm:object-center"
        />
      </motion.div>

      {/* Left fade — text legibility without washing the image */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,oklch(1_0_0_/_95%)_0%,oklch(1_0_0_/_78%)_24%,oklch(1_0_0_/_35%)_46%,oklch(1_0_0_/_8%)_64%,transparent_80%)]"
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
            About Us
          </motion.p>

          <motion.h1
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            variants={item}
          >
            Engineering{" "}
            <span className="text-[oklch(0.52_0.16_255)]">Reliable</span>{" "}
            Compressed Air Solutions{" "}
            <span className="text-[oklch(0.52_0.16_255)]">
              For Modern Industries.
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground"
            variants={item}
          >
            For over 25 years, SPR Air Systems has been helping manufacturers
            improve productivity through energy-efficient compressed air
            solutions.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <motion.div variants={item}>
              <Link
                href="/products"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 cursor-pointer rounded-md bg-[oklch(0.52_0.16_255)] px-5 text-sm font-semibold text-white hover:bg-[oklch(0.46_0.16_255)]",
                )}
              >
                Explore Products
                <ArrowRightIcon className="size-4" aria-hidden />
              </Link>
            </motion.div>
            <motion.div variants={item}>
              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 cursor-pointer rounded-md border-[oklch(0.52_0.16_255)] bg-white px-5 text-sm font-semibold text-[oklch(0.52_0.16_255)] hover:bg-[oklch(0.96_0.02_250)] hover:text-[oklch(0.46_0.16_255)]",
                )}
              >
                <FileTextIcon className="size-4" aria-hidden />
                Request Quote
              </button>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      <RequestQuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </section>
  );
}
