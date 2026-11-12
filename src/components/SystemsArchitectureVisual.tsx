"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { AETHERON_EASE } from "./MotionPrimitives";

const SYSTEM_NODES = [
  { id: "ai", label: "Applied AI", cx: 120, cy: 112 },
  { id: "eng", label: "Systems Engineering", cx: 360, cy: 112 },
  { id: "design", label: "Thoughtful Design", cx: 120, cy: 338 },
  { id: "impact", label: "Real-World Impact", cx: 360, cy: 338 },
] as const;

export function SystemsArchitectureVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 24 });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4.5, 4.5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4.5, -4.5]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto w-full max-w-[520px] [perspective:1100px]"
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { rotateX, rotateY }}
        className="relative overflow-hidden rounded-3xl border border-[#E5EAF1] bg-gradient-to-br from-[#FFFFFF] via-[#FAFBFD] to-[#EFF4FB] p-6 sm:p-8 shadow-[0_24px_60px_-28px_rgba(20,42,73,0.14)]"
      >
        {/* Subtle blueprint grid */}
        <div
          aria-hidden="true"
          className="bg-architectural-grid pointer-events-none absolute inset-0 opacity-60"
        />

        {/* Luminous soft-blue ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(93,141,224,0.18)_0%,rgba(239,244,251,0)_72%)]"
        />

        <div className="relative z-10 flex items-center justify-between border-b border-[#E5EAF1]/80 pb-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#536176]">
            Interconnected Architecture
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#315EAB]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5D8DE0]" />
            Unified Core
          </span>
        </div>

        {/* SVG Systems Lattice */}
        <div className="relative z-10 mt-3 aspect-[480/450] w-full">
          <svg
            viewBox="0 0 480 450"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
            role="img"
            aria-label="Abstract architectural diagram showing interconnected AI, engineering, design, and real-world systems"
          >
            <defs>
              <linearGradient
                id="conduit-grad"
                x1="80"
                y1="80"
                x2="400"
                y2="370"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#315EAB" stopOpacity="0.25" />
                <stop offset="0.5" stopColor="#5D8DE0" stopOpacity="0.55" />
                <stop stopColor="#142A49" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient
                id="core-grad"
                x1="190"
                y1="175"
                x2="290"
                y2="275"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#142A49" />
                <stop offset="1" stopColor="#315EAB" />
              </linearGradient>
            </defs>

            {/* Orbital geometry */}
            <circle
              cx="240"
              cy="225"
              r="164"
              stroke="#E5EAF1"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <motion.circle
              cx="240"
              cy="225"
              r="116"
              stroke="#DCE6F5"
              strokeWidth="1.2"
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
              style={{ originX: "240px", originY: "225px" }}
            />
            <circle
              cx="240"
              cy="225"
              r="68"
              stroke="#5D8DE0"
              strokeOpacity="0.25"
              strokeWidth="1"
            />

            {/* Curved conduits connecting nodes to core */}
            <path
              d="M120 112 C 175 112, 185 190, 240 225"
              stroke="url(#conduit-grad)"
              strokeWidth="1.35"
            />
            <path
              d="M360 112 C 305 112, 295 190, 240 225"
              stroke="url(#conduit-grad)"
              strokeWidth="1.35"
            />
            <path
              d="M120 338 C 175 338, 185 260, 240 225"
              stroke="url(#conduit-grad)"
              strokeWidth="1.35"
            />
            <path
              d="M360 338 C 305 338, 295 260, 240 225"
              stroke="url(#conduit-grad)"
              strokeWidth="1.35"
            />

            {/* Lateral cross-links */}
            <path
              d="M120 112 Q 240 76 360 112"
              stroke="#DCE6F5"
              strokeWidth="1"
            />
            <path
              d="M120 338 Q 240 374 360 338"
              stroke="#DCE6F5"
              strokeWidth="1"
            />
            <path
              d="M120 112 Q 86 225 120 338"
              stroke="#DCE6F5"
              strokeWidth="1"
            />
            <path
              d="M360 112 Q 394 225 360 338"
              stroke="#DCE6F5"
              strokeWidth="1"
            />

            {/* Animated signal pulses along primary paths */}
            {!shouldReduceMotion && (
              <>
                <motion.path
                  d="M120 112 C 175 112, 185 190, 240 225"
                  stroke="#315EAB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="16 180"
                  initial={{ strokeDashoffset: 196 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.path
                  d="M360 112 C 305 112, 295 190, 240 225"
                  stroke="#5D8DE0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="16 180"
                  initial={{ strokeDashoffset: 196 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 3.9,
                    delay: 0.7,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.path
                  d="M120 338 C 175 338, 185 260, 240 225"
                  stroke="#5D8DE0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="16 180"
                  initial={{ strokeDashoffset: 196 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 4.1,
                    delay: 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.path
                  d="M360 338 C 305 338, 295 260, 240 225"
                  stroke="#315EAB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="16 180"
                  initial={{ strokeDashoffset: 196 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 3.6,
                    delay: 1.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </>
            )}

            {/* Central Aetheron Core */}
            <clipPath id="core-emblem-clip">
              <circle cx="240" cy="225" r="24" />
            </clipPath>
            <motion.circle
              cx="240"
              cy="225"
              r="34"
              fill="#FFFFFF"
              stroke="#DCE6F5"
              strokeWidth="1.5"
              initial={{ scale: 0.94, opacity: 0.85 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: AETHERON_EASE }}
            />
            <image
              href="/images/brand/aetheron-emblem.jpg"
              x="215"
              y="200"
              width="50"
              height="50"
              clipPath="url(#core-emblem-clip)"
              preserveAspectRatio="xMidYMid slice"
            />

            {/* Outer Domain Nodes */}
            {SYSTEM_NODES.map((node, i) => (
              <g key={node.id}>
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r="22"
                  fill="#FFFFFF"
                  stroke="#E5EAF1"
                  strokeWidth="1.25"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { scale: [1, 1.04, 1] }
                  }
                  transition={{
                    duration: 4.2,
                    delay: i * 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ originX: `${node.cx}px`, originY: `${node.cy}px` }}
                />
                <circle cx={node.cx} cy={node.cy} r="5.5" fill="#315EAB" />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="10"
                  stroke="#5D8DE0"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                />
                <rect
                  x={node.cx - 64}
                  y={node.cy < 225 ? node.cy - 48 : node.cy + 29}
                  width="128"
                  height="24"
                  rx="12"
                  fill="#FFFFFF"
                  fillOpacity="0.94"
                  stroke="#E5EAF1"
                  strokeWidth="1"
                />
                <text
                  x={node.cx}
                  y={node.cy < 225 ? node.cy - 32.5 : node.cy + 44.5}
                  textAnchor="middle"
                  fill="#142A49"
                  fontSize="10.5"
                  fontWeight="500"
                  letterSpacing="0.02em"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Subtle Bottom Caption */}
        <div className="relative z-10 mt-2 flex items-center justify-between border-t border-[#E5EAF1]/80 pt-4 text-[12px] text-[#536176]">
          <span>Purposeful Intelligence</span>
          <span className="font-medium text-[#142A49]">
            Built for enduring clarity
          </span>
        </div>
      </motion.div>
    </div>
  );
}
