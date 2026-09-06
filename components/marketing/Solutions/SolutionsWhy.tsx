"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CheckCircle2Icon } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { solutionReasons } from "@/data/solutions";
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
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: ITEM_TRANSITION },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: ITEM_TRANSITION },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

const reducedImageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

/**
 * Catalogue "why choose us" — checklist left, plant photo right.
 */
export function SolutionsWhy() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const imageV = prefersReducedMotion ? reducedImageVariants : imageVariants;

  return (
    <Section data-slot="solutions-why" spacing="sm" className="bg-white">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className="flex items-center gap-3 text-small font-semibold tracking-[0.16em] text-[oklch(0.52_0.16_255)] uppercase"
              variants={item}
            >
              <span
                className="h-px w-6 shrink-0"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              />
              Why Choose Us
            </motion.p>

            <motion.h2
              className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-[2.2rem] lg:leading-[1.18]"
              variants={item}
            >
              Built For Duty.{" "}
              <span className="text-[oklch(0.52_0.16_255)]">
                Backed After Handover.
              </span>
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
              High-quality, energy-efficient equipment is only half of a
              compressed-air solution. The other half is installation,
              genuine spares, and someone who answers when the plant is down.
            </motion.p>

            <motion.ul className="mt-7 flex flex-col gap-3.5" variants={item}>
              {solutionReasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <CheckCircle2Icon
                    className="mt-0.5 size-5 shrink-0 text-[oklch(0.52_0.16_255)]"
                    aria-hidden
                    strokeWidth={2}
                  />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {reason}
                  </span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 shadow-[0_16px_44px_-20px_oklch(0.26_0.09_260_/_28%)]",
            )}
            variants={imageV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src="/images/hero.png"
              alt="SPR Air Systems engineer with industrial air equipment"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,oklch(0.18_0.08_255_/_18%)_0%,transparent_60%)]"
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
