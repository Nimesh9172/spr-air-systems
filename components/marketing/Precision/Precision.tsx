"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BadgeCheckIcon, ZapIcon, type LucideIcon } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
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
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

const reducedImageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

type FeatureTone = "blue" | "green";

const FEATURES: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: FeatureTone;
}[] = [
  {
    icon: BadgeCheckIcon,
    title: "Factory-Tested Quality",
    description:
      "Every system is inspected and performance-tested before dispatch, so you get reliable air from day one.",
    tone: "blue",
  },
  {
    icon: ZapIcon,
    title: "Energy Efficient Design",
    description:
      "PM motor VFD packages that match motor speed to air demand and cut wasted unload energy.",
    tone: "green",
  },
];

const featureToneClass: Record<
  FeatureTone,
  { icon: string; title: string }
> = {
  blue: {
    icon: "bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]",
    title: "text-foreground",
  },
  green: {
    icon: "bg-[oklch(0.95_0.04_150)] text-ds-success",
    title: "text-ds-success",
  },
};

/**
 * Homepage precision / engineering excellence split card — not the About Us page.
 */
export function Precision() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const image = prefersReducedMotion ? reducedImageVariants : imageVariants;

  return (
    <Section data-slot="precision" spacing="sm" className="bg-white">
      <Container>
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-border bg-white shadow-[0_1px_0_oklch(0.26_0.09_260_/_4%)] transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grid lg:grid-cols-[1.15fr_1fr]",
            !prefersReducedMotion &&
              "has-[[data-slot=precision-image]:hover]:shadow-[0_18px_44px_-12px_oklch(0.55_0.14_255_/_0.28)]",
          )}
        >
          <motion.div
            data-slot="precision-image"
            className="group/precision relative min-h-[18rem] overflow-hidden sm:min-h-[22rem] lg:min-h-full lg:self-stretch"
            variants={image}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src="/images/precision2.png"
              alt="SPR Air Systems VFD compressor and air receiver in an industrial facility"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className={cn(
                "object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
                !prefersReducedMotion &&
                  "group-hover/precision:-translate-y-1 group-hover/precision:scale-[1.02]",
              )}
            />

            {/* Soft blue air-flow sweep — left → right on hover */}
            {!prefersReducedMotion ? (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[42%] -translate-x-[120%] bg-[linear-gradient(90deg,transparent_0%,oklch(0.72_0.12_250_/_0.17)_45%,oklch(0.78_0.1_250_/_0.12)_55%,transparent_100%)] group-hover/precision:animate-air-flow-sweep"
              />
            ) : null}
          </motion.div>

          <motion.div
            className="relative flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 xl:px-14"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Subtle airflow watermark */}
            <svg
              aria-hidden
              viewBox="0 0 320 220"
              className="pointer-events-none absolute right-0 bottom-0 h-[55%] w-[70%] text-border/70"
              preserveAspectRatio="xMaxYMax meet"
            >
              <path
                d="M20 180c40-30 80-30 120 0s80 30 120 0M0 140c45-28 90-28 135 0s90 28 135 0M40 100c40-26 80-26 120 0s80 26 120 0M10 60c45-24 90-24 135 0s90 24 135 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            </svg>

            <div className="relative z-10 flex max-w-md flex-col">
              <motion.p
                className="text-sm font-medium text-[oklch(0.52_0.16_255)]"
                variants={item}
              >
                -Engineering Excellence
              </motion.p>

              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                <motion.span className="block text-foreground" variants={item}>
                  Precision in Every
                </motion.span>
                <motion.span
                  className="block text-[oklch(0.52_0.16_255)]"
                  variants={item}
                >
                  Breath of Air
                </motion.span>
              </h2>

              <motion.div
                className="mt-5 h-px w-14 bg-[oklch(0.52_0.16_255)]"
                variants={item}
                aria-hidden
              />

              <motion.p
                className="mt-5 text-base leading-relaxed text-muted-foreground"
                variants={item}
              >
                At SPR Air Systems, we don&apos;t just provide equipment; we
                engineer reliability. Our systems are the heartbeat of
                manufacturing plants, pharmaceutical labs, and automotive lines.
              </motion.p>

              <ul className="mt-8 flex flex-col gap-5">
                {FEATURES.map((feature) => {
                  const Icon = feature.icon;
                  const tone = featureToneClass[feature.tone];

                  return (
                    <motion.li
                      key={feature.title}
                      className="flex gap-3.5"
                      variants={item}
                    >
                      <span
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-full",
                          tone.icon,
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p className={cn("font-semibold", tone.title)}>
                          {feature.title}
                        </p>
                        <p className="mt-1 text-small leading-relaxed text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
