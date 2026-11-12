"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AETHERON_EASE } from "./MotionPrimitives";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(timer);
    }

    const startTime = Date.now();
    const duration = 1350; // 1.35 seconds for a refined, non-blocking intro

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(current);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 220);
      }
    }, 24);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.65, ease: AETHERON_EASE },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAFBFD]"
          aria-live="polite"
          aria-busy={loading}
        >
          {/* Subtle Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(93,141,224,0.18)_0%,rgba(239,244,251,0.5)_45%,rgba(250,251,253,0)_75%)] blur-2xl"
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Emblem Reveal */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: AETHERON_EASE }}
              className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-[#E5EAF1] bg-[#FFFFFF] p-2.5 shadow-[0_16px_40px_-16px_rgba(49,94,171,0.22)]"
            >
              <Image
                src="/images/brand/aetheron-emblem.png"
                alt="Aetheron.AI"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: AETHERON_EASE }}
              className="mt-6 flex flex-col items-center"
            >
              <span className="font-display text-[19px] font-semibold tracking-[-0.02em] text-[#101C32]">
                AETHERON<span className="text-[#315EAB]">.AI</span>
              </span>
              <span className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.22em] text-[#536176]">
                Technologies Private Limited
              </span>
            </motion.div>

            {/* Precision Hairline Progress Bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 160 }}
              transition={{ duration: 0.45, delay: 0.3, ease: AETHERON_EASE }}
              className="mt-8 flex flex-col items-center gap-2"
            >
              <div className="relative h-[2px] w-40 overflow-hidden rounded-full bg-[#E5EAF1]">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#142A49] via-[#315EAB] to-[#5D8DE0]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-accent text-[11px] font-medium tabular-nums text-[#536176]/80">
                {progress}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
