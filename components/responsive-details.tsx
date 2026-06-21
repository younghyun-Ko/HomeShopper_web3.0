"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ResponsiveDetailsProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveDetails({ children, className }: ResponsiveDetailsProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        details.setAttribute("open", "");
      } else {
        // Closed by default on mobile, but let users open it if they wish
        // Only remove if it was not manually opened/closed, or just reset to closed on resize
        details.removeAttribute("open");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <details ref={detailsRef} className={className}>
      {children}
    </details>
  );
}
