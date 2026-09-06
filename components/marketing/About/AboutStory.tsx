"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  AwardIcon,
  FactoryIcon,
  HeadsetIcon,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { COMPANY_STATS } from "@/constants/company";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.65, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
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

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE_OUT } },
};

const reducedImageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const STORY_STATS: {
  icon: LucideIcon;
  value: string;
  label: string;
}[] = [
  {
    icon: AwardIcon,
    value: `${COMPANY_STATS.yearsExperience}+`,
    label: "Years of Experience",
  },
  {
    icon: FactoryIcon,
    value: `${COMPANY_STATS.systemsInstalled}+`,
    label: "Systems Installed",
  },
  { icon: HeadsetIcon, value: "24/7", label: "Support Available" },
];

/**
 * About page story split — image left, narrative + inline stats right.
 */
export function AboutStory() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const image = prefersReducedMotion ? reducedImageVariants : imageVariants;

  return (
    <Section
      data-slot="about-story"
      spacing="sm"
      className="bg-[oklch(0.975_0.008_250)]"
    >
      <Container>
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_8px_36px_-18px_oklch(0.26_0.09_260_/_22%)] lg:grid lg:grid-cols-[1fr_1.1fr]">
          {/* Image */}
          <motion.div
            className="relative min-h-[18rem] overflow-hidden sm:min-h-[22rem] lg:min-h-full lg:self-stretch"
            variants={image}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src="/images/precision2.png"
              alt="SPR Air Systems industrial facility"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,oklch(0.18_0.06_255_/_30%)_100%)]"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            className="flex flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className={cn(
                "flex items-center gap-3 text-small font-semibold tracking-[0.16em] uppercase",
                "text-[oklch(0.52_0.16_255)]",
              )}
              variants={item}
            >
              <span
                className="h-px w-6 shrink-0"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              />
              Our Story
            </motion.p>

            <motion.h2
              className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-[2.2rem] lg:leading-[1.18]"
              variants={item}
            >
              Precision.{" "}
              <span className="text-[oklch(0.52_0.16_255)]">Performance.</span>{" "}
              Partnership.
            </motion.h2>

            <motion.div
              className="mt-4 h-px w-12"
              style={{ backgroundColor: ACCENT }}
              variants={item}
              aria-hidden
            />

            <motion.p
              className="mt-5 text-base leading-relaxed text-muted-foreground"
              variants={item}
            >
              SPR Air Systems was founded with a vision to provide industries
              with reliable, energy-efficient compressed air solutions. Today we
              serve manufacturing, pharmaceuticals, automotive, food processing,
              textiles and engineering industries with complete air system
              solutions.
            </motion.p>

            {/* Inline stats */}
            <motion.ul
              className="mt-8 grid grid-cols-3 gap-3 sm:gap-5"
              variants={item}
            >
              {STORY_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <li
                    key={stat.label}
                    className="flex flex-col items-start gap-2"
                  >
                    <span className="flex size-10 items-center justify-center rounded-full bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]">
                      <Icon
                        className="size-5"
                        aria-hidden
                        strokeWidth={1.75}
                      />
                    </span>
                    <p className="text-xl font-bold tracking-tight text-[oklch(0.52_0.16_255)] sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="text-xs leading-snug text-muted-foreground">
                      {stat.label}
                    </p>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
