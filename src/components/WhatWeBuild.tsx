"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FOCUS_AREAS } from "@/config/company";
import {
  AETHERON_EASE,
  EditorialReveal,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "./MotionPrimitives";
import { AetherBuiltFeature } from "./AetherBuiltFeature";

export function WhatWeBuild() {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  return (
    <section
      id="what-we-build"
      className="relative border-t border-[#E5EAF1] bg-[#FAFBFD] py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <Reveal y={14}>
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#315EAB]">
              02 / What We Are Building
            </p>
          </Reveal>

          <h2 className="font-display mt-5 text-[clamp(2.1rem,3.9vw,3.35rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#101C32]">
            <EditorialReveal delay={0.05}>
              <span>Building what comes next.</span>
            </EditorialReveal>
          </h2>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-[16px] sm:text-[17.5px] leading-[1.7] text-[#536176]">
              We develop intelligent products and technology systems designed to
              simplify complexity, improve operations, and unlock new
              possibilities.
            </p>
          </Reveal>
        </div>

        {/* Minimal Architectural Areas of Focus */}
        <StaggerGroup
          staggerDelay={0.07}
          className="mt-14 border-t border-[#E5EAF1]"
        >
          {FOCUS_AREAS.map((area) => {
            const isHovered = hoveredIndex === area.index;
            return (
              <StaggerItem key={area.index}>
                <div
                  onMouseEnter={() => setHoveredIndex(area.index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(area.index)}
                  onBlur={() => setHoveredIndex(null)}
                  tabIndex={0}
                  className="group relative border-b border-[#E5EAF1] transition-colors duration-300 focus:outline-none"
                >
                  {/* Animated subtle soft-blue background wash */}
                  <motion.div
                    aria-hidden="true"
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: AETHERON_EASE }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#EFF4FB]/75 via-[#EFF4FB]/40 to-transparent"
                  />

                  {/* Animated left accent rule */}
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      scaleY: isHovered ? 1 : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: AETHERON_EASE }}
                    className="absolute bottom-3 left-0 top-3 w-[2px] origin-top rounded-full bg-gradient-to-b from-[#142A49] to-[#5D8DE0]"
                  />

                  <div className="relative z-10 grid grid-cols-1 items-baseline gap-3 px-2 py-7 sm:px-5 lg:grid-cols-12 lg:gap-8 lg:py-8">
                    <div className="flex items-center gap-4 lg:col-span-2">
                      <span
                        className={`font-accent text-[13px] font-medium tabular-nums transition-colors duration-300 ${
                          isHovered ? "text-[#315EAB]" : "text-[#536176]/75"
                        }`}
                      >
                        {area.index}
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#536176]/80">
                        {area.discipline}
                      </span>
                    </div>

                    <h3 className="font-display text-[20px] sm:text-[23px] font-medium tracking-[-0.02em] text-[#101C32] transition-transform duration-300 group-hover:translate-x-1 lg:col-span-5">
                      {area.title}
                    </h3>

                    <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#536176] lg:col-span-5">
                      {area.summary}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Featured Product — AetherBuilt */}
        <AetherBuiltFeature />
      </div>
    </section>
  );
}
