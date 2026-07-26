"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type NavActiveLineProps = {
  className?: string;
  left: number;
  width: number;
  /** When false, snap into place (first measure) instead of springing. */
  animate?: boolean;
};

/**
 * Single underline under the nav list — positioned by measured left/width.
 * Avoids Framer `layoutId`, which mis-animates after page scroll.
 */
export function NavActiveLine({
  className,
  left,
  width,
  animate = true,
}: NavActiveLineProps) {
  return (
    <motion.span
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-primary",
        className,
      )}
      initial={false}
      animate={{ left, width, opacity: width > 0 ? 1 : 0 }}
      transition={
        animate
          ? { type: "spring", stiffness: 420, damping: 32, mass: 0.6 }
          : { duration: 0 }
      }
    />
  );
}
