"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { SOLUTION_ICONS } from "@/components/marketing/Solutions/icons";
import { solutionCategories } from "@/data/solutions";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.55, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

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
 * Four catalogue cover categories — compressors, treatment, piping, service.
 */
export function SolutionsCategories() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section
      data-slot="solutions-categories"
      spacing="sm"
      className="bg-white"
    >
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
            — What We Supply —
          </motion.p>
          <motion.h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            variants={item}
          >
            Four Families.{" "}
            <span className="text-[oklch(0.52_0.16_255)]">One System.</span>
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
            Generation, treatment, distribution, and after-sales — the same
            four blocks as the catalogue, specified together so pressure, dew
            point, and uptime actually hold.
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {solutionCategories.map((category) => {
            const Icon = SOLUTION_ICONS[category.icon];

            return (
              <motion.li
                key={category.id}
                variants={item}
                className="flex h-full flex-col rounded-2xl border border-border/60 bg-[oklch(0.975_0.008_250)] p-6"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-white text-[oklch(0.5_0.16_255)] shadow-[0_8px_20px_-12px_oklch(0.52_0.16_255_/_0.45)]">
                  <Icon className="size-5" aria-hidden strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-base font-bold tracking-tight text-foreground">
                  {category.title}
                </h3>
                <div
                  className="mt-3 h-px w-8"
                  style={{ backgroundColor: ACCENT }}
                  aria-hidden
                />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}
