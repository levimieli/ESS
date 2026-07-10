"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type TypeHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** milliseconds per character */
  speed?: number;
};

/**
 * Types a heading out character-by-character when it scrolls into view.
 *
 * Robust by design: the full text is always rendered (an invisible copy
 * reserves its exact size to prevent layout shift, and is the visible text for
 * no-JS, reduced-motion, and SSR / crawlers via `aria-label`). Typing is
 * triggered by a scroll/resize + bounding-box check rather than an
 * IntersectionObserver, so it fires reliably.
 */
export function TypeHeading({
  text,
  as = "h2",
  className,
  speed = 26,
}: TypeHeadingProps) {
  const Tag = as;
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduced) return;
    const el = ref.current;
    if (!el) return;

    let intervalId: number | undefined;

    const inViewport = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.85 && r.bottom > 0;
    };

    const start = () => {
      if (started.current || !inViewport()) return;
      started.current = true;
      window.removeEventListener("scroll", start);
      window.removeEventListener("resize", start);
      let i = 0;
      intervalId = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) window.clearInterval(intervalId);
      }, speed);
    };

    start(); // already in view at mount?
    if (!started.current) {
      window.addEventListener("scroll", start, { passive: true });
      window.addEventListener("resize", start);
    }

    return () => {
      window.removeEventListener("scroll", start);
      window.removeEventListener("resize", start);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [mounted, reduced, speed, text.length]);

  const animate = mounted && !reduced;
  const typing = animate && count < text.length;

  return (
    <Tag ref={ref} aria-label={text} className={`relative ${className ?? ""}`}>
      {/* Reserves size; visible text for SSR / no-JS / reduced motion */}
      <span className={cn("block [text-wrap:normal]", animate && "invisible")}>
        {text}
      </span>

      {animate && (
        <span
          aria-hidden="true"
          className="absolute inset-0 block [text-wrap:normal]"
        >
          {text.slice(0, count)}
          {typing && (
            <span className="type-caret ml-[0.05em] inline-block h-[0.8em] w-[2px] translate-y-[0.06em] bg-amber-deep align-baseline" />
          )}
        </span>
      )}
    </Tag>
  );
}
