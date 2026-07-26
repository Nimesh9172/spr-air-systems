"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isNavActive } from "@/components/layout/Navbar/is-nav-active";
import { NavActiveLine } from "@/components/layout/Navbar/NavActiveLine";
import { navLinks } from "@/config/navigation";
import { cn } from "@/lib/utils";

type NavLinksProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
  /** Disable the sliding underline (e.g. mobile drawer). */
  showActiveLine?: boolean;
};

/**
 * Primary text links rendered from `config/navigation`.
 */
export function NavLinks({
  className,
  linkClassName,
  onNavigate,
  showActiveLine = true,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("relative flex items-center gap-0.5", className)}>
      {navLinks.map((item) => {
        const active = isNavActive(pathname, item.href);

        return (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "relative inline-flex rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "text-primary"
                  : "text-foreground/75 hover:text-primary",
                linkClassName,
              )}
            >
              {item.label}
              {active && showActiveLine ? <NavActiveLine /> : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
