"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

export const AETHERON_EASE: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  amount?: number | "some";
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.75,
  y = 18,
  amount = 0.06,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: AETHERON_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: (staggerDelay = 0.09) => ({
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.04,
    },
  }),
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: AETHERON_EASE,
    },
  },
};

export function StaggerGroup({
  children,
  className,
  staggerDelay = 0.09,
  amount = 0.06,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  amount?: number | "some";
}) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      custom={staggerDelay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

const lineMaskVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (delay = 0) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.82,
      delay,
      ease: AETHERON_EASE,
    },
  }),
};

export function EditorialReveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  if (immediate) {
    return (
      <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
        <motion.span
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.85, delay, ease: AETHERON_EASE }}
          className={`block ${className ?? ""}`}
        >
          {children}
        </motion.span>
      </span>
    );
  }

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="block overflow-hidden pb-[0.14em] -mb-[0.14em]"
    >
      <motion.span
        variants={lineMaskVariants}
        custom={delay}
        className={`block ${className ?? ""}`}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export function ScrollParallax({
  children,
  className,
  offset = 36,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
