"use client";

import * as React from "react";

/**
 * Tracks which section is currently in view based on a list of ids.
 * Returns the active section id (or null before mount).
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const visibleMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleMap.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleMap.delete(entry.target.id);
          }
        }
        // pick the most visible
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visibleMap) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActive(best);
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
