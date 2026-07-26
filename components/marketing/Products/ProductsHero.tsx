"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { DownloadIcon } from "lucide-react";

import { Container } from "@/components/core/Container";
import { buttonVariants } from "@/components/ui/button";
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
 * Products page header — catalog intro and brochure download action.
 */
export function ProductsHero() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <section
      data-slot="products-hero"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,oklch(0.97_0.02_250)_0%,oklch(0.985_0.01_250)_42%,oklch(0.96_0.035_250)_100%)]"
    >
      {/* Soft blue glow accents */}
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
              Product Catalog
            </motion.p>

            <motion.h1
              className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
              variants={item}
            >
              Industrial Air Compression{" "}
              <span className="text-[oklch(0.52_0.16_255)]">Solutions</span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
              variants={item}
            >
              Engineering high-performance air systems for mission-critical
              industrial applications. From heavy-duty reciprocating units to
              precision oil-free technology.
            </motion.p>
          </div>

          <motion.div variants={item} className="lg:shrink-0 lg:pb-1">
            <a
              href="/brochures/spr-air-systems-catalogue.pdf"
              download
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-md border-[oklch(0.52_0.16_255)] bg-white px-5 text-sm font-semibold text-[oklch(0.52_0.16_255)] hover:bg-[oklch(0.96_0.02_250)] hover:text-[oklch(0.46_0.16_255)]",
              )}
            >
              <DownloadIcon className="size-4" aria-hidden />
              Download Full Catalogue
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
