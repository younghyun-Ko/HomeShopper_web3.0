"use client";

import { useEffect } from "react";

const sectionTints: { id: string; color: string }[] = [
  { id: "search-hero", color: "rgba(0,131,255,0.04)" },
  { id: "hero",        color: "rgba(0,131,255,0.00)" },
  { id: "why",         color: "rgba(76,44,226,0.09)"  },
  { id: "three-steps", color: "rgba(49,93,255,0.06)"  },
  { id: "ai",          color: "rgba(76,44,226,0.09)"  },
];

export function MainScrollEffect() {
  useEffect(() => {
    let triggers: (() => void)[] = [];

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const overlay = document.createElement("div");
      overlay.style.cssText =
        "position:fixed;inset:0;pointer-events:none;z-index:0;transition:background-color 0.9s ease;background-color:rgba(0,0,0,0);";
      document.body.appendChild(overlay);

      for (let i = 1; i < sectionTints.length; i++) {
        const el = document.getElementById(sectionTints[i].id);
        if (!el) continue;

        const prev = sectionTints[i - 1].color;
        const next = sectionTints[i].color;

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 65%",
          end: "top 35%",
          scrub: 1.2,
          onUpdate(self) {
            const progress = self.progress;
            overlay.style.backgroundColor =
              progress < 0.5 ? prev : next;
          },
        });

        triggers.push(() => st.kill());
      }

      return () => {
        triggers.forEach((fn) => fn());
        overlay.remove();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return null;
}
