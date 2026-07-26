"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

type LineBox = { left: number; width: number };

const LINE_INSET = 12;

function measureActiveLine(
  list: HTMLUListElement,
  link: HTMLAnchorElement,
): LineBox {
  const listBox = list.getBoundingClientRect();
  const linkBox = link.getBoundingClientRect();

  return {
    left: linkBox.left - listBox.left + LINE_INSET,
    width: Math.max(0, linkBox.width - LINE_INSET * 2),
  };
}

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
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [line, setLine] = useState<LineBox>({ left: 0, width: 0 });
  const [canAnimate, setCanAnimate] = useState(false);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const active = navLinks.find((item) => isNavActive(pathname, item.href));
    if (!active) {
      setLine({ left: 0, width: 0 });
      return;
    }

    const link = linkRefs.current.get(active.href + active.label);
    if (!link) return;

    setLine(measureActiveLine(list, link));
  }, [pathname]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setCanAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const update = () => {
      const list = listRef.current;
      if (!list) return;

      const active = navLinks.find((item) => isNavActive(pathname, item.href));
      if (!active) {
        setLine({ left: 0, width: 0 });
        return;
      }

      const link = linkRefs.current.get(active.href + active.label);
      if (!link) return;

      setLine(measureActiveLine(list, link));
    };

    window.addEventListener("resize", update);

    const list = listRef.current;
    const ro =
      typeof ResizeObserver !== "undefined" && list
        ? new ResizeObserver(update)
        : null;
    if (list && ro) ro.observe(list);

    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [pathname]);

  return (
    <ul
      ref={listRef}
      className={cn("relative flex items-center gap-0.5", className)}
    >
      {navLinks.map((item) => {
        const active = isNavActive(pathname, item.href);
        const key = item.href + item.label;

        return (
          <li key={key}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              ref={(node) => {
                if (node) linkRefs.current.set(key, node);
                else linkRefs.current.delete(key);
              }}
              className={cn(
                "relative inline-flex rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "text-primary"
                  : "text-foreground/75 hover:text-primary",
                linkClassName,
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}

      {showActiveLine ? (
        <NavActiveLine
          left={line.left}
          width={line.width}
          animate={canAnimate}
        />
      ) : null}
    </ul>
  );
}
