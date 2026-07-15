"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { rise } from "@/lib/motion";
import { img, unsplash } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const scrollToNext = () => {
    ref.current?.nextElementSibling?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-graphite-deep text-center"
    >
      {/* Background */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10 scale-110">
        <Image
          src={unsplash(img.hardHatsFloor.id, 2400, 80)}
          alt={img.hardHatsFloor.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.9] contrast-[1.08] saturate-[1.05]"
        />
      </motion.div>
      <motion.div
        style={{ opacity: scrimOpacity }}
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-graphite-deep/80 via-graphite-deep/45 to-graphite-deep/85"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,oklch(0.158_0.012_246/0.35),transparent)]"
      />

      {/* Content — statement in the upper-middle, scroll line filling down to the bottom */}
      <div className="container-x relative flex min-h-[100svh] w-full flex-col items-center pb-8 pt-28">
        {/* spacer lifts the statement slightly above centre */}
        <div className="grow-[0.85]" aria-hidden="true" />

        <motion.h1
          variants={rise}
          initial="hidden"
          animate="show"
          className="max-w-[46ch] text-balance font-display text-xl font-medium leading-relaxed text-onDark/90 sm:text-2xl sm:leading-relaxed"
        >
          We audit, inspect and build the systems that keep your people safe and
          your business compliant — from the first site walk through to
          ISO&nbsp;45001 certification, right across New South Wales.
        </motion.h1>

        {/* Scroll line — begins just below the statement, stretches almost to the bottom */}
        <button
          type="button"
          onClick={scrollToNext}
          aria-label="Scroll to explore"
          className="group mt-8 flex grow flex-col items-center text-white/70 transition-colors duration-300 hover:text-white"
        >
          <span
            aria-hidden="true"
            className="w-px flex-1 bg-white/40 transition-colors duration-300 group-hover:bg-white/75"
          />
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            aria-hidden="true"
            className="-mt-px"
          >
            <path
              d="M2 2.5 L9 9.5 L16 2.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
