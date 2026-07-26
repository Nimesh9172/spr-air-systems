"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  HeadsetIcon,
  SettingsIcon,
  UsersIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.6, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

const STEPS: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: UsersIcon,
    title: "Consultation",
    description: "Understanding your requirements and challenges.",
  },
  {
    icon: ClipboardListIcon,
    title: "Requirement Analysis",
    description: "Detailed site survey and system assessment.",
  },
  {
    icon: SettingsIcon,
    title: "Product Selection",
    description: "Matching the right solution to your needs.",
  },
  {
    icon: WrenchIcon,
    title: "Installation",
    description: "Professional setup with piping and electrical.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Testing",
    description: "Comprehensive commissioning and validation.",
  },
  {
    icon: HeadsetIcon,
    title: "After Sales Support",
    description: "Ongoing maintenance and 24x7 technical help.",
  },
];

/**
 * Homepage process timeline — the six steps of working with SPR Air Systems.
 */
export function Process() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section data-slot="process" spacing="sm" className="bg-white">
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
            — Our Process —
          </motion.p>
          <motion.h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            variants={item}
          >
            How We Work{" "}
            <span className="text-[oklch(0.52_0.16_255)]">With You</span>
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
            A seamless process designed to deliver the right compressed air
            solution for your business.
          </motion.p>
        </motion.div>

        <motion.ol
          className="mt-14 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;

            return (
              <motion.li
                key={step.title}
                variants={item}
                className="relative flex flex-col items-center text-center"
              >
                {/* Dashed connector to the next step — desktop only */}
                {!isLast && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-6 left-[calc(50%+2.25rem)] hidden w-[calc(100%-4.5rem)] items-center lg:flex"
                  >
                    <span className="h-px flex-1 border-t border-dashed border-[oklch(0.82_0.05_250)]" />
                    <span className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[oklch(0.52_0.16_255)]" />
                  </span>
                )}

                <span className="flex size-12 items-center justify-center rounded-full bg-[oklch(0.52_0.16_255)] text-base font-bold text-white shadow-[0_8px_20px_-8px_oklch(0.52_0.16_255_/_0.6)]">
                  {index + 1}
                </span>

                <span
                  aria-hidden
                  className="h-7 border-l border-dashed border-[oklch(0.82_0.05_250)]"
                />

                <span className="flex size-16 items-center justify-center rounded-full bg-[oklch(0.95_0.02_250)] text-[oklch(0.5_0.16_255)]">
                  <Icon className="size-7" aria-hidden strokeWidth={1.5} />
                </span>

                <h3 className="mt-5 text-balance text-base font-bold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <div
                  className="mt-2.5 h-px w-8"
                  style={{ backgroundColor: ACCENT }}
                  aria-hidden
                />
                <p className="mt-3 max-w-[13rem] text-small leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ol>
      </Container>
    </Section>
  );
}
