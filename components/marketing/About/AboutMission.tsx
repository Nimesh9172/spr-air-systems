"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CheckIcon, CompassIcon, StarIcon, TargetIcon } from "lucide-react";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.6, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

const OUR_VALUES = [
  "Integrity in every commitment",
  "Innovation in every solution",
  "Quality in every product",
  "Customer success is our priority",
];

const CARDS = [
  {
    icon: TargetIcon,
    title: "Our Mission",
    body: "To deliver reliable, energy-efficient compressed air solutions that enhance productivity and create long-term value for our customers.",
    extras: null as string[] | null,
  },
  {
    icon: CompassIcon,
    title: "Our Vision",
    body: "To be the most trusted partner in compressed air systems by setting the benchmark for quality, innovation and customer satisfaction.",
    extras: null as string[] | null,
  },
  {
    icon: StarIcon,
    title: "Our Values",
    body: null as string | null,
    extras: OUR_VALUES,
  },
];

/**
 * About page mission / vision / values — three equal cards.
 */
export function AboutMission() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section
      data-slot="about-mission"
      spacing="sm"
      className="bg-[oklch(0.975_0.008_250)]"
    >
      <Container>
        <motion.ul
          className="grid gap-6 sm:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.li
                key={card.title}
                variants={item}
                className="flex flex-col rounded-2xl border border-border/60 bg-white p-6 shadow-[0_8px_28px_-18px_oklch(0.26_0.09_260_/_20%)] sm:p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]">
                  <Icon className="size-5" aria-hidden strokeWidth={1.75} />
                </span>

                <h3 className="mt-5 text-base font-bold tracking-tight text-foreground sm:text-lg">
                  {card.title}
                </h3>

                <div
                  className="mt-3 h-px w-8"
                  style={{ backgroundColor: ACCENT }}
                  aria-hidden
                />

                {card.body ? (
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                ) : null}

                {card.extras ? (
                  <ul className="mt-4 flex flex-1 flex-col gap-2.5">
                    {card.extras.map((val) => (
                      <li
                        key={val}
                        className="flex items-start gap-2.5 text-sm leading-snug text-muted-foreground"
                      >
                        <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[oklch(0.52_0.16_255)] text-white">
                          <CheckIcon
                            className="size-2.5"
                            aria-hidden
                            strokeWidth={3}
                          />
                        </span>
                        {val}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}
