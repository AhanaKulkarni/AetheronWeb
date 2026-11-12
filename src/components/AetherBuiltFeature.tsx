"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Layers,
  Cpu,
  ShoppingCart,
  Package,
  FileText,
  Truck,
  Monitor,
  Share2,
} from "lucide-react";
import {
  AETHERBUILT_DETAILS,
  AETHERBUILT_WEBSITE_URL,
  isExternalConfiguredUrl,
} from "@/config/company";
import { AETHERON_EASE, Reveal } from "./MotionPrimitives";
import { AetherBuiltProductVisual } from "./AetherBuiltProductVisual";

const TOPOLOGY_NODES = [
  {
    name: "Production",
    subtitle: "Line scheduling & shift OEE",
    Icon: Layers,
    x: 105,
    y: 70,
  },
  {
    name: "Machines",
    subtitle: "IoT vibration & thermal telemetry",
    Icon: Cpu,
    x: 395,
    y: 70,
  },
  {
    name: "Orders",
    subtitle: "Work orders & delivery tracking",
    Icon: ShoppingCart,
    x: 75,
    y: 185,
  },
  {
    name: "Inventory",
    subtitle: "Lot traceability & staging bins",
    Icon: Package,
    x: 425,
    y: 185,
  },
  {
    name: "Procurement",
    subtitle: "Vendor RFQs & automated POs",
    Icon: FileText,
    x: 115,
    y: 310,
  },
  {
    name: "Vendors",
    subtitle: "Compliance & inbound freight",
    Icon: Truck,
    x: 385,
    y: 310,
  },
] as const;

export function AetherBuiltFeature() {
  const [viewMode, setViewMode] = useState<"product" | "topology">("product");
  const [activeDomain, setActiveDomain] = useState<string>("Production");
  const [showPendingNotice, setShowPendingNotice] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const hasLiveUrl = isExternalConfiguredUrl(AETHERBUILT_WEBSITE_URL);

  return (
    <Reveal y={28} amount={0.12}>
      <div
        id="aetherbuilt"
        className="scroll-mt-24 relative mt-20 overflow-hidden rounded-[28px] border border-[#E5EAF1] bg-gradient-to-br from-[#FFFFFF] via-[#FAFBFD] to-[#EFF4FB] p-6 sm:p-9 lg:mt-24 lg:p-12 shadow-[0_28px_70px_-32px_rgba(20,42,73,0.12)]"
      >
        {/* Subtle decorative soft-blue ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(93,141,224,0.16)_0%,rgba(239,244,251,0)_72%)]"
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Narrative Column */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#DCE6F5] bg-[#FFFFFF]/90 px-3.5 py-1.5 shadow-[0_2px_10px_-4px_rgba(49,94,171,0.12)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#315EAB]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#315EAB]">
                {AETHERBUILT_DETAILS.label}
              </span>
            </div>

            <h3 className="font-display mt-6 text-[clamp(2.1rem,3.4vw,3.1rem)] font-medium tracking-[-0.03em] text-[#101C32]">
              {AETHERBUILT_DETAILS.name}
            </h3>

            <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.7] text-[#142A49]">
              {AETHERBUILT_DETAILS.description}
            </p>

            <p className="mt-4 text-[14.5px] sm:text-[15px] leading-[1.7] text-[#536176]">
              {AETHERBUILT_DETAILS.supportingLine}
            </p>

            {/* Operational Domains Pill Selector */}
            <div className="mt-7 flex flex-wrap gap-2">
              {AETHERBUILT_DETAILS.domains.map((domain) => {
                const selected = activeDomain === domain;
                return (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => setActiveDomain(domain)}
                    className={`rounded-full border px-3.5 py-1.5 text-[12px] sm:text-[12.5px] font-medium transition-all duration-300 ${
                      selected
                        ? "border-[#315EAB]/40 bg-[#142A49] text-white shadow-[0_6px_18px_-8px_rgba(20,42,73,0.45)]"
                        : "border-[#E5EAF1] bg-[#FFFFFF]/85 text-[#536176] hover:border-[#5D8DE0]/50 hover:text-[#142A49]"
                    }`}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {hasLiveUrl ? (
                <a
                  href={AETHERBUILT_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#142A49] to-[#315EAB] px-7 py-3.5 text-[14.5px] font-medium text-white shadow-[0_10px_28px_-10px_rgba(49,94,171,0.5)] transition-all duration-300 hover:shadow-[0_14px_32px_-10px_rgba(49,94,171,0.68)] hover:brightness-105"
                >
                  <span>{AETHERBUILT_DETAILS.ctaLabel}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPendingNotice((prev) => !prev)}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#142A49] to-[#315EAB] px-7 py-3.5 text-[14.5px] font-medium text-white shadow-[0_10px_28px_-10px_rgba(49,94,171,0.5)] transition-all duration-300 hover:shadow-[0_14px_32px_-10px_rgba(49,94,171,0.68)] hover:brightness-105"
                >
                  <span>{AETHERBUILT_DETAILS.ctaLabel}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              )}
            </div>

            <AnimatePresence>
              {!hasLiveUrl && showPendingNotice && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3, ease: AETHERON_EASE }}
                  className="mt-4 rounded-2xl border border-[#DCE6F5] bg-[#FFFFFF]/95 p-4 text-[13.5px] leading-[1.6] text-[#536176]"
                >
                  <p>
                    The dedicated AetherBuilt website link (
                    <code className="rounded bg-[#EFF4FB] px-1.5 py-0.5 text-[12px] text-[#142A49]">
                      {AETHERBUILT_WEBSITE_URL}
                    </code>
                    ) is being configured.
                  </p>
                  <Link
                    href="/?topic=Product+Inquiry#contact"
                    className="mt-2 inline-flex items-center gap-1.5 font-medium text-[#315EAB] hover:text-[#142A49]"
                  >
                    <span>Request an AetherBuilt briefing via Contact</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Native Product Visual & Topology Column */}
          <div className="lg:col-span-7">
            {/* View Switcher Controls */}
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#536176]">
                Interactive Architecture Preview
              </span>

              <div className="flex items-center gap-1 rounded-xl border border-[#E5EAF1] bg-[#FFFFFF] p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("product")}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11.5px] font-medium transition-colors ${
                    viewMode === "product"
                      ? "bg-[#142A49] text-white shadow-xs"
                      : "text-[#536176] hover:text-[#101C32]"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" />
                  <span>Command Center</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("topology")}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11.5px] font-medium transition-colors ${
                    viewMode === "topology"
                      ? "bg-[#142A49] text-white shadow-xs"
                      : "text-[#536176] hover:text-[#101C32]"
                  }`}
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Network Topology</span>
                </button>
              </div>
            </div>

            {/* View 1: Native AetherBuilt SaaS Product Interface */}
            {viewMode === "product" && <AetherBuiltProductVisual />}

            {/* View 2: Abstract Factory Workflow Topology */}
            {viewMode === "topology" && (
              <div className="overflow-hidden rounded-[24px] border border-[#E5EAF1] bg-[#FFFFFF] p-4 sm:p-6 shadow-[0_24px_60px_-24px_rgba(20,42,73,0.14)]">
                <svg
                  viewBox="0 0 500 370"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Abstract AetherBuilt operating system diagram connecting production, machines, orders, inventory, procurement, and vendors"
                >
                  <defs>
                    <linearGradient
                      id="ab-core-grad"
                      x1="205"
                      y1="128"
                      x2="295"
                      y2="218"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#142A49" />
                      <stop offset="1" stopColor="#315EAB" />
                    </linearGradient>
                  </defs>

                  <circle
                    cx="250"
                    cy="185"
                    r="128"
                    stroke="#EFF4FB"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx="250"
                    cy="185"
                    r="76"
                    stroke="#E5EAF1"
                    strokeDasharray="3 5"
                    strokeWidth="1"
                  />

                  {TOPOLOGY_NODES.map((mod, idx) => {
                    const isSelected = activeDomain.toLowerCase().includes(mod.name.toLowerCase());
                    const pathD = `M ${mod.x} ${mod.y} Q ${(mod.x + 250) / 2} ${(mod.y + 185) / 2} 250 185`;
                    return (
                      <g key={mod.name}>
                        <path
                          d={pathD}
                          stroke={isSelected ? "#315EAB" : "#DCE6F5"}
                          strokeWidth={isSelected ? "1.8" : "1.15"}
                          className="transition-colors duration-300"
                        />
                        {!shouldReduceMotion && (
                          <motion.path
                            d={pathD}
                            stroke={isSelected ? "#5D8DE0" : "#7DA8EA"}
                            strokeWidth={isSelected ? "2.2" : "1.5"}
                            strokeLinecap="round"
                            strokeDasharray="12 160"
                            initial={{ strokeDashoffset: 172 }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{
                              duration: isSelected ? 2.1 : 3.2,
                              delay: idx * 0.45,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        )}
                      </g>
                    );
                  })}

                  <circle
                    cx="250"
                    cy="185"
                    r="44"
                    fill="#EFF4FB"
                    stroke="#DCE6F5"
                    strokeWidth="1"
                  />
                  <circle cx="250" cy="185" r="30" fill="url(#ab-core-grad)" />
                  <text
                    x="250"
                    y="182"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9.5"
                    fontWeight="600"
                    letterSpacing="0.06em"
                  >
                    AETHER
                  </text>
                  <text
                    x="250"
                    y="194"
                    textAnchor="middle"
                    fill="#DCE6F5"
                    fontSize="8.5"
                    fontWeight="500"
                    letterSpacing="0.1em"
                  >
                    BUILT OS
                  </text>

                  {TOPOLOGY_NODES.map((mod) => {
                    const isSelected = activeDomain.toLowerCase().includes(mod.name.toLowerCase());
                    const boxWidth = 132;
                    const boxHeight = 46;
                    return (
                      <g
                        key={mod.name}
                        className="cursor-pointer"
                        onClick={() => setActiveDomain(mod.name)}
                        onMouseEnter={() => setActiveDomain(mod.name)}
                      >
                        <rect
                          x={mod.x - boxWidth / 2}
                          y={mod.y - boxHeight / 2}
                          width={boxWidth}
                          height={boxHeight}
                          rx="12"
                          fill={isSelected ? "#142A49" : "#FFFFFF"}
                          stroke={isSelected ? "#315EAB" : "#E5EAF1"}
                          strokeWidth="1.2"
                        />
                        <text
                          x={mod.x}
                          y={mod.y - 3}
                          textAnchor="middle"
                          fill={isSelected ? "#FFFFFF" : "#101C32"}
                          fontSize="11"
                          fontWeight="600"
                        >
                          {mod.name}
                        </text>
                        <text
                          x={mod.x}
                          y={mod.y + 12}
                          textAnchor="middle"
                          fill={isSelected ? "#DCE6F5" : "#536176"}
                          fontSize="8.5"
                        >
                          {mod.subtitle}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="mt-3 flex items-center justify-between rounded-xl border border-[#E5EAF1] bg-[#FAFBFD] px-4 py-3 text-[12.5px]">
                  <span className="text-[#536176]">
                    Active operating domain:{" "}
                    <strong className="font-semibold text-[#142A49]">
                      {activeDomain}
                    </strong>
                  </span>
                  <span className="text-[11.5px] font-medium text-[#315EAB]">
                    Unified Data Conduits
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
