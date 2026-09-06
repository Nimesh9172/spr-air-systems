"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  BuildingIcon,
  HeadsetIcon,
  PackageIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
} from "lucide-react";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { COMPANY_STATS } from "@/constants/company";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.6, ease: EASE_OUT } as const;
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
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: ITEM_TRANSITION },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: ITEM_TRANSITION },
};

const MILESTONES = [
  {
    year: String(COMPANY_STATS.foundedYear),
    icon: BuildingIcon,
    title: "Company Founded",
    description:
      "Started our journey with a commitment to quality and reliability.",
  },
  {
    year: "2015",
    icon: ShieldCheckIcon,
    title: "Quality Assurance",
    description:
      "Built in-house inspection and testing for every system we deliver.",
  },
  {
    year: "2018",
    icon: PackageIcon,
    title: "Product Expansion",
    description:
      "Expanded our range with advanced and energy-efficient solutions.",
  },
  {
    year: "2022",
    icon: HeadsetIcon,
    title: "Dedicated Support",
    description:
      "Grew on-site installation, AMC, and 24/7 after-sales support.",
  },
  {
    year: "2026",
    icon: TrendingUpIcon,
    title: `${COMPANY_STATS.systemsInstalled}+ Installations`,
    description: `Crossed ${COMPANY_STATS.systemsInstalled}+ installations and continue to grow together.`,
  },
] as const;

/**
 * About page journey timeline — five horizontal milestones.
 */
export function AboutJourney() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section data-slot="about-journey" spacing="sm" className="bg-white">
      <Container>
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            variants={item}
          >
            Our Journey
          </motion.h2>
          <motion.div
            className="mx-auto mt-3 h-0.5 w-10 rounded-full"
            style={{ backgroundColor: ACCENT }}
            variants={item}
            aria-hidden
          />
        </motion.div>

        <motion.ol
          className="relative mt-12 grid gap-x-3 gap-y-10 sm:grid-cols-3 lg:mt-14 lg:grid-cols-5 lg:gap-x-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {MILESTONES.map((ms, index) => {
            const Icon = ms.icon;
            const isLast = index === MILESTONES.length - 1;

            return (
              <motion.li
                key={ms.year}
                variants={item}
                className="relative flex flex-col items-center text-center"
              >
                {/* Dashed connector — desktop only */}
                {!isLast && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-6 left-[calc(50%+2rem)] hidden w-[calc(100%-4rem)] lg:flex"
                  >
                    <span className="h-px w-full border-t border-dashed border-[oklch(0.82_0.05_250)]" />
                  </span>
                )}

                {/* Year badge */}
                <span className="flex h-12 min-w-[4.5rem] items-center justify-center rounded-full bg-[oklch(0.52_0.16_255)] px-4 text-sm font-bold text-white shadow-[0_8px_18px_-8px_oklch(0.52_0.16_255_/_0.55)]">
                  {ms.year}
                </span>

                <span
                  aria-hidden
                  className="h-6 border-l border-dashed border-[oklch(0.82_0.05_250)]"
                />

                {/* Icon */}
                <span className="flex size-16 items-center justify-center rounded-full bg-[oklch(0.95_0.02_250)] text-[oklch(0.5_0.16_255)]">
                  <Icon className="size-7" aria-hidden strokeWidth={1.5} />
                </span>

                <h3 className="mt-4 text-sm font-bold tracking-tight text-foreground sm:text-[0.9375rem]">
                  {ms.title}
                </h3>

                <div
                  className="mx-auto mt-2 h-px w-8"
                  style={{ backgroundColor: ACCENT }}
                  aria-hidden
                />

                <p className="mt-2.5 max-w-[11rem] text-xs leading-relaxed text-muted-foreground sm:text-small">
                  {ms.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ol>
      </Container>
    </Section>
  );
}
