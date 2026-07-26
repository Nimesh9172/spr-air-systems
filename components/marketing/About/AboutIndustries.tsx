"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  BeakerIcon,
  CarIcon,
  CpuIcon,
  FactoryIcon,
  FlameIcon,
  ScissorsIcon,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.5, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
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

const INDUSTRIES: { icon: LucideIcon; label: string }[] = [
  { icon: FactoryIcon, label: "Manufacturing" },
  { icon: CarIcon, label: "Automotive" },
  { icon: BeakerIcon, label: "Pharmaceuticals" },
  { icon: FlameIcon, label: "Food & Beverage" },
  { icon: ScissorsIcon, label: "Textile" },
  { icon: CpuIcon, label: "Engineering" },
];

/**
 * About page industries grid — six sectors served.
 */
export function AboutIndustries() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section
      data-slot="about-industries"
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
          <motion.h2
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            variants={item}
          >
            Industries We Serve
          </motion.h2>
          <motion.div
            className="mx-auto mt-3 h-0.5 w-10 rounded-full"
            style={{ backgroundColor: ACCENT }}
            variants={item}
            aria-hidden
          />
        </motion.div>

        <motion.ul
          className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-6 sm:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <motion.li
                key={ind.label}
                variants={item}
                className="flex flex-col items-center gap-3 text-center"
              >
                <span className="flex size-16 items-center justify-center rounded-full border border-[oklch(0.88_0.04_250)] bg-[oklch(0.95_0.02_250)] text-[oklch(0.5_0.16_255)] transition-colors hover:bg-[oklch(0.52_0.16_255)] hover:text-white hover:border-[oklch(0.52_0.16_255)]">
                  <Icon className="size-7" aria-hidden strokeWidth={1.5} />
                </span>
                <span className="text-xs font-semibold tracking-wide text-foreground">
                  {ind.label}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}
