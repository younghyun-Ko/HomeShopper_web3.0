"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type NavigationItem = {
  id: number;
  title: string;
  href: string;
};

type AnimatedNavigationTabsProps = {
  items: NavigationItem[];
  className?: string;
  onItemClick?: (item: NavigationItem, event: MouseEvent<HTMLAnchorElement>) => void;
};

export function AnimatedNavigationTabs({
  items,
  className,
  onItemClick,
}: AnimatedNavigationTabsProps) {
  const pathname = usePathname();

  return (
    <div className="relative min-w-0">
      <ul
        className={cn(
          "flex min-w-0 flex-wrap items-center gap-0.5 md:flex-nowrap md:overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className,
        )}
      >
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(`${item.href}/`));

          return (
            <li key={item.id} className="relative shrink-0">
              <Link
                href={item.href}
                onClick={(event) => onItemClick?.(item, event)}
                className={cn(
                  "group relative inline-flex items-center justify-center rounded-md px-[13px] py-2 font-[family-name:var(--font-body)] text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none",
                  isActive
                    ? "text-[var(--color-text)]"
                    : "text-[#8D9AAF] hover:text-[var(--color-text)] focus-visible:text-[var(--color-text)]",
                )}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[42px] w-[120%] -translate-x-1/2 -translate-y-1/2 scale-[0.92] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(49,93,255,0.22)_0%,rgba(49,93,255,0.12)_34%,rgba(49,93,255,0.05)_58%,rgba(49,93,255,0.015)_74%,rgba(49,93,255,0)_100%)] opacity-0 blur-[18px] mix-blend-multiply transition-[opacity,transform] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                />
                <span className="relative z-10">{item.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="active"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[var(--color-accent)]"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
