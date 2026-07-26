"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRightIcon,
  CompassIcon,
  CircleDollarSignIcon,
  SettingsIcon,
  ShieldIcon,
  TruckIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { cn } from "@/lib/utils";

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

const PILLARS: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    icon: ShieldIcon,
    title: "Reliable Products",
    description:
      "Built to perform under the most demanding industrial conditions with minimal downtime.",
    href: "/solutions",
  },
  {
    icon: ZapIcon,
    title: "Energy Efficient",
    description:
      "Advanced technology that reduces power consumption by up to 35% compared to conventional systems.",
    href: "/solutions",
  },
  {
    icon: SettingsIcon,
    title: "Industry Expertise",
    description:
      "Deep domain knowledge across 10+ industries ensures tailored solutions for your specific needs.",
    href: "/solutions",
  },
  {
    icon: TruckIcon,
    title: "Fast Service",
    description:
      "Rapid response team with 24x7 availability ensures your operations never stop.",
    href: "/contact",
  },
  {
    icon: CircleDollarSignIcon,
    title: "Affordable Solutions",
    description:
      "Competitive pricing without compromising on quality or performance standards.",
    href: "/products",
  },
  {
    icon: CompassIcon,
    title: "Custom Engineering",
    description:
      "Bespoke solutions designed and engineered to match your exact operational requirements.",
    href: "/services",
  },
];

/**
 * Homepage value pillars grid — what sets SPR Air Systems apart.
 */
export function ValuePillars() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section
      data-slot="value-pillars"
      spacing="sm"
      className="relative overflow-hidden bg-[oklch(0.97_0.01_250)]"
    >
      {/* Decorative waves — left */}
      <svg
        aria-hidden
        viewBox="0 0 420 520"
        className="pointer-events-none absolute top-8 -left-8 h-[70%] w-[min(42%,22rem)] text-[oklch(0.88_0.04_250)]"
        preserveAspectRatio="xMinYMid meet"
      >
        <path
          d="M40 40c80 60 80 120 0 180s-80 120 0 180M90 20c80 60 80 120 0 180s-80 120 0 180M140 0c80 60 80 120 0 180s-80 120 0 180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </svg>

      {/* Decorative dots — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-8 grid grid-cols-6 gap-2 opacity-50 sm:right-14"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="size-1 rounded-full bg-[oklch(0.72_0.08_250)]"
          />
        ))}
      </div>

      <Container className="relative z-10">
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
            — Our Value Pillars —
          </motion.p>
          <motion.h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            variants={item}
          >
            What Sets Us{" "}
            <span className="text-[oklch(0.52_0.16_255)]">Apart</span>
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
            Engineered for performance. Built for reliability. Delivering
            excellence in every system we build.
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <motion.li key={pillar.title} variants={item} className="h-full">
                <motion.div
                  className="h-full"
                  whileHover={
                    prefersReducedMotion ? undefined : { y: -7 }
                  }
                  transition={{
                    type: "tween",
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={pillar.href}
                    aria-label={`Learn more about ${pillar.title}`}
                    className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-white p-6 shadow-[0_8px_30px_-18px_oklch(0.26_0.09_260_/_28%)] outline-none transition-shadow duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_20px_44px_-18px_oklch(0.35_0.08_255_/_0.28)] focus-visible:shadow-[0_20px_44px_-18px_oklch(0.35_0.08_255_/_0.28)] sm:p-7"
                  >
                    {/* Left accent — fills from mid outward */}
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-[3px] origin-center scale-y-0 bg-[oklch(0.52_0.16_255)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-y-100 group-focus-visible/card:scale-y-100"
                    />

                    {/* Soft blue glow overlay */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_0_32px_-4px_oklch(0.55_0.14_255_/_0.4)] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:opacity-100 group-focus-visible/card:opacity-100"
                    />

                    <span className="relative mb-5 flex size-12 shrink-0 items-center justify-center rounded-full bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)] transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:bg-[oklch(0.52_0.16_255)] group-hover/card:text-white group-focus-visible/card:bg-[oklch(0.52_0.16_255)] group-focus-visible/card:text-white">
                      <Icon className="size-5" aria-hidden />
                    </span>

                    <h3 className="relative text-lg font-bold tracking-tight text-foreground">
                      {pillar.title}
                    </h3>
                    <div
                      className="relative mt-3 h-px w-10"
                      style={{ backgroundColor: ACCENT }}
                      aria-hidden
                    />
                    <p className="relative mt-3 flex-1 text-small leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>

                    <span className="relative mt-6 ml-auto flex size-9 items-center justify-center rounded-full border border-[oklch(0.82_0.05_250)] text-[oklch(0.5_0.16_255)] transition-[color,background-color,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:border-[oklch(0.52_0.16_255)] group-hover/card:bg-[oklch(0.96_0.02_250)] group-focus-visible/card:border-[oklch(0.52_0.16_255)] group-focus-visible/card:bg-[oklch(0.96_0.02_250)]">
                      <ArrowRightIcon
                        className={cn(
                          "size-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          !prefersReducedMotion &&
                            "group-hover/card:translate-x-1 group-focus-visible/card:translate-x-1",
                        )}
                        aria-hidden
                      />
                    </span>
                  </Link>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}
