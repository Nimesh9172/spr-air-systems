"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/core/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.68, ease: EASE_OUT } as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/** Full entrance: subtle rise + fade. Used when motion is allowed. */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: ITEM_TRANSITION },
};

/** Reduced-motion entrance: fade only, no positional movement. */
const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: ITEM_TRANSITION },
};

/**
 * Full-bleed homepage hero — industrial imagery with primary messaging and CTAs.
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <section
      data-slot="hero"
      className="relative isolate flex min-h-[min(78vh,52rem)] items-center overflow-hidden"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={prefersReducedMotion ? false : { scale: 1.2 }}
        animate={prefersReducedMotion ? undefined : { scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Dark navy wash for typography contrast */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(105deg,oklch(0.22_0.08_260_/_82%)_0%,oklch(0.22_0.08_260_/_55%)_48%,oklch(0.22_0.08_260_/_35%)_100%)]"
      />

      <Container className="relative z-10 py-20 md:py-28 lg:py-32">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            <motion.span className="block" variants={item}>
              Compressed Air Solutions
            </motion.span>
            <motion.span className="block" variants={item}>
              That Power Industry
            </motion.span>
          </h1>

          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
            variants={item}
          >
            Delivering precision-engineered air systems for high-stakes
            industrial environments. Engineered for efficiency, built for
            reliability.
          </motion.p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <motion.div variants={item}>
              <Link
                href="/solutions"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-md bg-white px-6 text-sm font-medium text-primary hover:bg-white/90",
                )}
              >
                Explore Solutions
              </Link>
            </motion.div>
            <motion.div variants={item}>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-md border-white/70 bg-transparent px-6 text-sm font-medium text-white hover:bg-white/10 hover:text-white",
                )}
              >
                Download Brochure
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
