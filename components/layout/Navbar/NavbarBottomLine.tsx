"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type NavbarBottomLineProps = {
  visible: boolean;
  className?: string;
};

/**
 * Full-width bottom edge that slides in when the navbar becomes solid.
 */
export function NavbarBottomLine({ visible, className }: NavbarBottomLineProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden",
        className,
      )}
    >
      <motion.div
        className="h-full origin-left bg-border"
        initial={false}
        animate={{ scaleX: visible ? 1 : 0 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  );
}
