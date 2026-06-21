"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function SiteContentShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hasNavbar = pathname !== "/login";

  return <div className={`flex-1 ${hasNavbar ? "pt-14" : ""}`}>{children}</div>;
}
