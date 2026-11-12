"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { COMPANY_INFO } from "@/config/company";
import { AETHERON_EASE, EditorialReveal } from "./MotionPrimitives";
import { HeroAmbientCanvas } from "./HeroAmbientCanvas";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backdropY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const about = document.getElementById("about");
    if (about) {
      e.preventDefault();
      about.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#FAFBFD] pt-28 pb-12 sm:pt-36 sm:pb-16"
    >
      {/* Emergent ambient radial gradients */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.25, ease: AETHERON_EASE }}
        style={{ y: backdropY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="bg-architectural-grid absolute inset-0 opacity-65 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_40%,transparent_100%)]" />
        <div className="absolute -top-40 left-1/2 h-[540px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(125,168,234,0.22)_0%,rgba(239,244,251,0.55)_45%,rgba(250,251,253,0)_75%)] blur-2xl" />
        <div className="absolute bottom-[-120px] right-[-80px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(93,141,224,0.12)_0%,rgba(250,251,253,0)_70%)]" />

        {/* Subtle geometric orbital arcs */}
        <svg
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full opacity-55"
          preserveAspectRatio="xMidYMid slice"
        >
          <motion.circle
            cx="600"
            cy="390"
            r="340"
            stroke="#E5EAF1"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 1.4, delay: 0.1, ease: AETHERON_EASE }}
          />
          <motion.circle
            cx="600"
            cy="390"
            r="480"
            stroke="#E5EAF1"
            strokeWidth="0.75"
            strokeDasharray="4 8"
            initial={{ opacity: 0, rotate: -12 }}
            animate={{ opacity: 0.65, rotate: 0 }}
            transition={{ duration: 1.8, delay: 0.2, ease: AETHERON_EASE }}
          />
        </svg>
      </motion.div>

      {/* Interactive hairline lattice canvas */}
      <HeroAmbientCanvas />

      {/* Main Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto my-auto flex w-full max-w-6xl flex-col items-center px-6 text-center lg:px-10"
      >
        {/* Minimal Identity Emblem Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05, ease: AETHERON_EASE }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#E5EAF1] bg-[#FFFFFF]/90 px-3.5 py-1.5 shadow-[0_4px_16px_-4px_rgba(20,42,73,0.08)] backdrop-blur-md sm:gap-3 sm:px-4"
        >
          <div className="relative h-5 w-5 overflow-hidden rounded-md border border-[#E5EAF1] bg-white">
            <Image
              src="/images/brand/aetheron-emblem.png"
              alt="Aetheron Emblem"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#536176] sm:text-[11.5px] sm:tracking-[0.2em]">
            Artificial Intelligence &amp; Software Systems
          </span>
        </motion.div>

        {/* Central Company Identity Heading */}
        <h1 className="font-display max-w-5xl text-[clamp(2.35rem,5.4vw,5rem)] leading-[1.04] tracking-[-0.035em] text-[#101C32]">
          <EditorialReveal immediate delay={0.14}>
            <span className="block font-medium text-gradient-navy">
              AETHERON.AI TECHNOLOGIES
            </span>
          </EditorialReveal>
          <EditorialReveal immediate delay={0.26}>
            <span className="mt-1.5 block text-[clamp(1.35rem,2.75vw,2.6rem)] font-light tracking-[0.14em] text-[#142A49]/85">
              PRIVATE LIMITED
            </span>
          </EditorialReveal>
        </h1>

        {/* Positioning Statement */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.42, ease: AETHERON_EASE }}
          className="font-display mt-8 max-w-3xl text-[clamp(1.2rem,2.1vw,1.65rem)] font-normal leading-[1.38] tracking-[-0.02em] text-[#142A49]"
        >
          {COMPANY_INFO.positioningStatement}
        </motion.p>

        {/* Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.54, ease: AETHERON_EASE }}
          className="mt-5 max-w-2xl text-[15.5px] sm:text-[17px] leading-[1.7] text-[#536176]"
        >
          {COMPANY_INFO.heroDescription}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.66, ease: AETHERON_EASE }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#about"
            onClick={scrollToAbout}
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#142A49] to-[#315EAB] px-7 py-3.5 text-[14.5px] font-medium text-white shadow-[0_10px_28px_-10px_rgba(49,94,171,0.55)] transition-all duration-300 hover:shadow-[0_14px_34px_-10px_rgba(49,94,171,0.7)] hover:brightness-105"
          >
            <span>Discover Aetheron</span>
            <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>

          <Link
            href="/founders"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#E5EAF1] bg-[#FFFFFF]/90 px-7 py-3.5 text-[14.5px] font-medium text-[#142A49] shadow-[0_2px_12px_-4px_rgba(20,42,73,0.06)] backdrop-blur-sm transition-all duration-300 hover:border-[#5D8DE0]/60 hover:bg-[#EFF4FB] hover:text-[#315EAB]"
          >
            <span>Meet the Founders</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.85, ease: AETHERON_EASE }}
        className="relative z-10 mx-auto mt-10 flex flex-col items-center gap-3"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#536176]/80">
          Scroll
        </span>
        <span
          aria-hidden="true"
          className="relative h-9 w-[1px] overflow-hidden bg-[#E5EAF1]"
        >
          <span className="animate-hairline-scroll absolute inset-x-0 top-0 h-4 w-full bg-gradient-to-b from-transparent via-[#315EAB] to-transparent" />
        </span>
      </motion.div>
    </section>
  );
}
