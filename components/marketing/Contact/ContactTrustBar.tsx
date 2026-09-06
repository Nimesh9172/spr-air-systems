"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  HandshakeIcon,
  HeadsetIcon,
  SettingsIcon,
  ShieldCheckIcon,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { COMPANY_STATS } from "@/constants/company";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.55, ease: EASE_OUT } as const;

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

const TRUST_ITEMS: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: ShieldCheckIcon,
    title: "Expert Engineers",
    description: `${COMPANY_STATS.yearsExperience}+ years of experience in compressed air systems`,
  },
  {
    icon: SettingsIcon,
    title: "Customized Solutions",
    description: "Tailored solutions for every industry need",
  },
  {
    icon: HeadsetIcon,
    title: "Reliable Support",
    description: "24/7 support for installation and maintenance",
  },
  {
    icon: HandshakeIcon,
    title: "Trusted by Industries",
    description: `Serving ${COMPANY_STATS.happyClients}+ clients across industries`,
  },
];

/**
 * Contact page trust strip — four value points below the map.
 */
export function ContactTrustBar() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section
      data-slot="contact-trust-bar"
      spacing="sm"
      className="border-t border-border/50 bg-white"
    >
      <Container>
        <motion.ul
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {TRUST_ITEMS.map((row) => {
            const Icon = row.icon;
            return (
              <motion.li
                key={row.title}
                variants={item}
                className="flex items-start gap-3.5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]">
                  <Icon className="size-5" aria-hidden strokeWidth={1.75} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-semibold text-foreground">
                    {row.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {row.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}
