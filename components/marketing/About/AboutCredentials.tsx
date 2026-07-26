"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  HeadsetIcon,
  HardHatIcon,
  Settings2Icon,
  ShoppingCartIcon,
  UsersIcon,
  WrenchIcon,
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

const CERTIFICATIONS: { label: string; sub: string; accent?: boolean }[] = [
  { label: "ISO", sub: "9001:2015" },
  { label: "CE", sub: "CERTIFIED" },
  { label: "Energy", sub: "Efficient", accent: true },
  { label: "OEM", sub: "OEM Support" },
];

const TEAM_ROLES: { icon: typeof UsersIcon; label: string }[] = [
  { icon: ShoppingCartIcon, label: "Sales & Marketing" },
  { icon: Settings2Icon, label: "Engineering" },
  { icon: HardHatIcon, label: "Installation" },
  { icon: HeadsetIcon, label: "Service & Support" },
  { icon: WrenchIcon, label: "Operations" },
];

/**
 * About page credentials — certifications and team roles side by side.
 */
export function AboutCredentials() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section data-slot="about-credentials" spacing="sm" className="bg-white">
      <Container>
        <motion.div
          className="grid gap-10 lg:grid-cols-2 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Certifications */}
          <motion.div variants={item}>
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Certifications
            </h2>
            <div
              className="mt-3 h-0.5 w-10 rounded-full"
              style={{ backgroundColor: ACCENT }}
              aria-hidden
            />

            <ul className="mt-7 grid grid-cols-4 gap-4">
              {CERTIFICATIONS.map((cert) => (
                <li
                  key={cert.label}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl border border-border/60 bg-[oklch(0.975_0.008_250)] px-3 py-5 text-center"
                >
                  <span
                    className="text-xl font-extrabold leading-none tracking-tight"
                    style={{ color: cert.accent ? "oklch(0.55 0.17 140)" : ACCENT }}
                  >
                    {cert.label}
                  </span>
                  <span className="mt-1 text-[0.625rem] font-semibold tracking-widest text-muted-foreground uppercase">
                    {cert.sub}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Team */}
          <motion.div variants={item}>
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Our Team
            </h2>
            <div
              className="mt-3 h-0.5 w-10 rounded-full"
              style={{ backgroundColor: ACCENT }}
              aria-hidden
            />

            <ul className="mt-7 grid grid-cols-5 gap-3">
              {TEAM_ROLES.map((role) => {
                const Icon = role.icon;
                return (
                  <li
                    key={role.label}
                    className="flex flex-col items-center gap-2.5 text-center"
                  >
                    <span className="flex size-14 items-center justify-center rounded-full border border-[oklch(0.88_0.04_250)] bg-[oklch(0.95_0.02_250)] text-[oklch(0.5_0.16_255)]">
                      <Icon
                        className="size-6"
                        aria-hidden
                        strokeWidth={1.5}
                      />
                    </span>
                    <span className="text-[0.65rem] font-semibold leading-snug text-muted-foreground">
                      {role.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
