"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EditorialReveal, Reveal } from "./MotionPrimitives";

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const ringRotate = useTransform(scrollYProgress, [0, 1], [-14, 18]);
  const arcY = useTransform(scrollYProgress, [0, 1], [35, -35]);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[#E5EAF1] bg-gradient-to-b from-[#FFFFFF] via-[#EFF4FB]/70 to-[#FAFBFD] py-28 sm:py-36 lg:py-44"
    >
      {/* Animated Abstract Harmonic Geometry */}
      <motion.div
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { y: arcY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.svg
          viewBox="0 0 1400 760"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={shouldReduceMotion ? undefined : { rotate: ringRotate }}
          className="h-[115%] w-[125%] max-w-none opacity-80"
        >
          <defs>
            <linearGradient
              id="philosophy-arc"
              x1="200"
              y1="100"
              x2="1200"
              y2="660"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#315EAB" stopOpacity="0.18" />
              <stop offset="0.5" stopColor="#7DA8EA" stopOpacity="0.28" />
              <stop offset="1" stopColor="#142A49" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <ellipse
            cx="700"
            cy="380"
            rx="540"
            ry="230"
            stroke="url(#philosophy-arc)"
            strokeWidth="1.15"
          />
          <ellipse
            cx="700"
            cy="380"
            rx="420"
            ry="320"
            stroke="#DCE6F5"
            strokeWidth="1"
            strokeDasharray="6 10"
          />
          <circle
            cx="700"
            cy="380"
            r="260"
            stroke="#5D8DE0"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
          <path
            d="M 120 380 Q 700 180 1280 380"
            stroke="#315EAB"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
          <path
            d="M 120 380 Q 700 580 1280 380"
            stroke="#5D8DE0"
            strokeOpacity="0.16"
            strokeWidth="1"
          />
        </motion.svg>
      </motion.div>

      {/* Atmospheric Center Radial Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.92)_0%,rgba(239,244,251,0.45)_55%,rgba(250,251,253,0)_80%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal y={14}>
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#315EAB]">
            03 / Our Philosophy
          </p>
        </Reveal>

        <h2 className="font-display mt-7 max-w-5xl text-[clamp(2.3rem,5vw,4.35rem)] font-medium leading-[1.07] tracking-[-0.035em] text-[#101C32]">
          <EditorialReveal delay={0.05}>
            <span>We believe technology</span>
          </EditorialReveal>
          <EditorialReveal delay={0.14}>
            <span>
              should{" "}
              <span className="text-gradient-navy">
                move the world forward.
              </span>
            </span>
          </EditorialReveal>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-[#E5EAF1] pt-10 md:grid-cols-12 md:gap-12">
          <Reveal delay={0.18} className="md:col-span-6">
            <p className="font-display text-[19px] sm:text-[21px] font-normal leading-[1.55] tracking-[-0.015em] text-[#142A49]">
              We believe the most meaningful technology doesn&apos;t simply add
              complexity. It makes the complex feel simple.
            </p>
          </Reveal>

          <Reveal delay={0.26} className="md:col-span-6">
            <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#536176]">
              Our ambition is to build intelligent systems that empower people,
              transform industries, and make previously difficult things
              possible.
            </p>

            <div className="mt-8">
              <Link
                href="/founders"
                className="group inline-flex items-center gap-2 text-[14.5px] font-medium text-[#315EAB] transition-colors hover:text-[#142A49]"
              >
                <span>Read the story behind Aetheron</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
