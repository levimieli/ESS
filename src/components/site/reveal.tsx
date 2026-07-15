"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type HTMLMotionProps, type Variants } from "motion/react";
import { rise, stagger, easeOutExpo } from "@/lib/motion";

type Trigger = "view" | "mount";

/**
 * Reliable reveal state. Uses IntersectionObserver for scroll reveals, but
 * falls back to "shown" when the element is already within the viewport at
 * mount, when trigger === "mount", or after a short grace period. Content is
 * never left gated behind an observer callback that may not fire (backgrounded
 * tab / throttled rAF / headless render).
 */
function useReveal<T extends HTMLElement>(trigger: Trigger = "view") {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const [primed, setPrimed] = useState(trigger === "mount");

  useEffect(() => {
    if (trigger === "mount") {
      setPrimed(true);
      return;
    }
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh * 0.92 && rect.bottom > 0) setPrimed(true);
    }
    const t = window.setTimeout(() => setPrimed(true), 1400);
    return () => window.clearTimeout(t);
  }, [trigger]);

  return { ref, show: primed || inView };
}

type RevealProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  trigger?: Trigger;
};

/** Fade-and-rise a block once it scrolls into view. */
export function Reveal({ children, className, trigger = "view", ...props }: RevealProps) {
  const { ref, show } = useReveal<HTMLDivElement>(trigger);
  return (
    <motion.div
      ref={ref}
      variants={rise}
      initial="hidden"
      animate={show ? "show" : "hidden"}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers direct <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  trigger = "view",
  variants = stagger,
  ...props
}: RevealProps & { variants?: Variants }) {
  const { ref, show } = useReveal<HTMLDivElement>(trigger);
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={show ? "show" : "hidden"}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Child item for use inside RevealGroup. */
export function RevealItem({ children, className, ...props }: RevealProps) {
  return (
    <motion.div variants={rise} className={className} {...props}>
      {children}
    </motion.div>
  );
}

type MaskHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  trigger?: Trigger;
};

/**
 * Word-by-word reveal for headlines. Each word fades and rises into place with
 * a stagger. No clipping (safe for large display type); reduced motion
 * collapses to a plain heading via MotionConfig.
 */
export function MaskHeading({ text, as = "h2", className, trigger = "view" }: MaskHeadingProps) {
  const Tag = as;
  const words = text.split(" ");
  const { ref, show } = useReveal<HTMLHeadingElement>(trigger);

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ opacity: 0, y: "0.4em" }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.4em" }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.04 + i * 0.05 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
