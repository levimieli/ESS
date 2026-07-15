"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal, RevealGroup, RevealItem, MaskHeading } from "@/components/site/reveal";
import { TypeHeading } from "@/components/site/type-heading";
import { approach, img, unsplash } from "@/lib/site";
import { staggerSlow, lineGrow } from "@/lib/motion";

export function Approach({ titleType = "reveal" }: { titleType?: "reveal" | "type" }) {
  const Heading = titleType === "type" ? TypeHeading : MaskHeading;
  return (
    <section
      id="approach"
      className="section relative scroll-mt-20 overflow-hidden bg-graphite text-onDark"
    >
      {/* atmospheric image, low presence */}
      <div aria-hidden="true" className="absolute inset-0 -z-0 opacity-[0.14]">
        <Image
          src={unsplash(img.workerBokeh.id, 1800, 60)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite via-graphite/85 to-graphite" />
      </div>

      <div className="container-x relative">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="kicker kicker-on-dark mb-6">How we work</p>
            <Heading
              as="h2"
              text="A method, not a checklist."
              className="text-h2 max-w-[14ch] font-display font-medium text-onDark"
            />
          </div>
          <Reveal className="flex items-end">
            <p className="measure text-lead text-onDark/80">
              Every engagement follows the same disciplined arc — from the first
              site walk to an ongoing rhythm that keeps you certain long after
              we&apos;ve handed over.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          variants={staggerSlow}
          className="mt-16 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {approach.map((item) => (
            <RevealItem
              key={item.step}
              className="group flex flex-col gap-4 bg-graphite p-7 transition-colors duration-500 hover:bg-graphite-deep"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-medium text-amber">
                  {item.step}
                </span>
                <motion.span
                  aria-hidden="true"
                  variants={lineGrow}
                  className="h-px w-8 origin-left bg-amber transition-[width] duration-500 group-hover:w-12"
                />
              </div>
              <h3 className="text-h3 font-display font-medium text-onDark">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-onDark/70">
                {item.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
