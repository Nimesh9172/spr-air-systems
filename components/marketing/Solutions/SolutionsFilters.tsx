"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { filterGrades } from "@/data/solutions";
import { cn } from "@/lib/utils";
import type { FilterGradeTone } from "@/types/solution";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.5, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const TONE: Record<FilterGradeTone, string> = {
  blue: "bg-[oklch(0.55_0.16_250)]",
  green: "bg-[oklch(0.55_0.15_150)]",
  red: "bg-[oklch(0.55_0.18_25)]",
  silver: "bg-[oklch(0.62_0.02_250)]",
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: ITEM_TRANSITION },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: ITEM_TRANSITION },
};

/**
 * SPR-XF filter grades for process-matched air treatment.
 */
export function SolutionsFilters() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section data-slot="solutions-filters" spacing="sm" className="bg-white">
      <Container>
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            className="text-small font-semibold tracking-[0.16em] text-[oklch(0.52_0.16_255)] uppercase"
            variants={item}
          >
            — SPR-XF Series —
          </motion.p>
          <motion.h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            variants={item}
          >
            Filtration Graded To{" "}
            <span className="text-[oklch(0.52_0.16_255)]">The Process</span>
          </motion.h2>
          <motion.div
            className="mx-auto mt-5 h-px w-12"
            style={{ backgroundColor: ACCENT }}
            variants={item}
            aria-hidden
          />
          <motion.p
            className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
            variants={item}
          >
            Four filter grades to match the process. Use the coarsest
            grade that still protects the line — over-filtering every drop
            wastes pressure and elements.
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {filterGrades.map((grade) => (
              <motion.li
                key={grade.id}
                variants={item}
                className="relative overflow-hidden rounded-2xl border border-border/60 bg-[oklch(0.975_0.008_250)] p-6"
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-y-0 left-0 w-1.5",
                    TONE[grade.tone],
                  )}
                />
                <h3 className="text-base font-bold tracking-tight text-foreground">
                  {grade.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {grade.role}
                </p>
              </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
