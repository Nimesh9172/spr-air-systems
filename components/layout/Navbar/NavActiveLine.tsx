"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type NavActiveLineProps = {
  className?: string;
  layoutId?: string;
};

/**
 * Shared sliding underline for the active desktop nav item.
 * Uses Framer Motion `layoutId` so the line animates between links.
 */
export function NavActiveLine({
  className,
  layoutId = "navbar-active-line",
}: NavActiveLineProps) {
  return (
    <motion.span
      layoutId={layoutId}
      aria-hidden
      className={cn(
        "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-current",
        className,
      )}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 32,
        mass: 0.6,
      }}
    />
  );
}
