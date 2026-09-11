"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { buttonVariants } from "@/components/ui/button";
import { solutionPiping } from "@/data/solutions";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.55, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
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

const imageVariants: Variants = {
  hidden: { opacity: 0, x: -28, scale: 1.04 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

const reducedImageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

/**
 * Dedicated SPR-PPR piping section — product photo + specs, linked to catalog.
 */
export function SolutionsPiping() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const imageV = prefersReducedMotion ? reducedImageVariants : imageVariants;
  const piping = solutionPiping;

  return (
    <Section
      data-slot="solutions-piping"
      spacing="sm"
      className="bg-[oklch(0.975_0.008_250)]"
    >
      <Container>
        <motion.div
          className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={imageV}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 shadow-[0_8px_28px_-18px_oklch(0.26_0.09_260_/_20%)]"
          >
            <Image
              src={piping.image}
              alt={piping.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <span className="absolute top-4 left-4 rounded-md bg-[oklch(0.52_0.16_255)] px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.1em] text-white uppercase">
              {piping.series}
            </span>
          </motion.div>

          <motion.div variants={item} className="flex flex-col">
            <p className="text-small font-semibold tracking-[0.16em] text-[oklch(0.52_0.16_255)] uppercase">
              — Distribution —
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
              {piping.name}
            </h2>
            <div
              className="mt-4 h-px w-10"
              style={{ backgroundColor: ACCENT }}
              aria-hidden
            />
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {piping.description}
            </p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {piping.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]">
                    <CheckIcon className="size-2.5" strokeWidth={3} aria-hidden />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <dl className="mt-7 overflow-hidden rounded-xl border border-border/60 bg-white">
              {piping.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid gap-1 border-b border-border/60 px-4 py-3 last:border-b-0 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4"
                >
                  <dt className="text-[0.65rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    {spec.label}
                  </dt>
                  <dd className="text-sm font-semibold text-foreground">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7">
              <Link
                href={piping.link.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-md bg-[oklch(0.52_0.16_255)] px-5 text-sm font-semibold text-white hover:bg-[oklch(0.46_0.16_255)]",
                )}
              >
                {piping.link.label}
                <ArrowRightIcon className="size-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
