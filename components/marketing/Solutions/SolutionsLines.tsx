"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { SOLUTION_ICONS } from "@/components/marketing/Solutions/icons";
import { solutionLines } from "@/data/solutions";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.5, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
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
 * Catalogue product families with published technical ranges.
 */
export function SolutionsLines() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section
      data-slot="solutions-lines"
      spacing="sm"
      className="bg-[oklch(0.975_0.008_250)]"
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
            — Product Lines —
          </motion.p>
          <motion.h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            variants={item}
          >
            Specified Ranges.{" "}
            <span className="text-[oklch(0.52_0.16_255)]">Not Guesswork.</span>
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
            The SPR series — reciprocating and screw compressors, refrigerated
            and desiccant dryers, filters, condensate handling, and PPR piping.
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {solutionLines.map((line) => {
            const Icon = SOLUTION_ICONS[line.icon];

            return (
              <motion.li
                key={line.id}
                variants={item}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_8px_28px_-18px_oklch(0.26_0.09_260_/_20%)]"
              >
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]">
                      <Icon className="size-5" aria-hidden strokeWidth={1.75} />
                    </span>
                    <span className="rounded-md bg-[oklch(0.52_0.16_255)] px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.1em] text-white uppercase">
                      {line.series}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">
                    {line.name}
                  </h3>
                  <div
                    className="mt-3 h-px w-8"
                    style={{ backgroundColor: ACCENT }}
                    aria-hidden
                  />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {line.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {line.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-full bg-[oklch(0.96_0.02_250)] px-2.5 py-1 text-[0.7rem] font-medium text-[oklch(0.38_0.1_255)]"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <dl className="grid gap-px border-t border-border/60 bg-border/60 sm:grid-cols-2">
                  {line.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-[oklch(0.985_0.006_250)] px-5 py-3.5"
                    >
                      <dt className="text-[0.65rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-foreground">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}
