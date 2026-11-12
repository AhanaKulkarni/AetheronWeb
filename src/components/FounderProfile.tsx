"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Check, Copy, ArrowUpRight } from "lucide-react";
import type { Founder } from "@/config/company";
import { AETHERON_EASE } from "./MotionPrimitives";

interface FounderProfileProps {
  founder: Founder;
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function FounderProfile({ founder }: FounderProfileProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(founder.phoneRaw);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: 0.12, ease: AETHERON_EASE }}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#E5EAF1] bg-[#FFFFFF] shadow-[0_24px_60px_-34px_rgba(20,42,73,0.12)] transition-all duration-500 hover:border-[#315EAB]/40 hover:shadow-[0_28px_70px_-28px_rgba(49,94,171,0.2)]"
    >
      {/* Portrait Frame — pristine executive studio photographic display with subtle depth */}
      <div className="relative aspect-[5/4] sm:aspect-[4/3] md:aspect-[5/4] w-full overflow-hidden border-b border-[#E5EAF1] bg-[radial-gradient(ellipse_at_50%_35%,#FFFFFF_0%,#F3F7FD_55%,#E7EFF9_100%)]">
        {/* Architectural background lattice & soft studio spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-architectural-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(93,141,224,0.15)_45%,transparent_72%)] blur-2xl"
        />

        {/* Grounding contact shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-12 h-8 bg-[radial-gradient(ellipse_at_bottom,rgba(20,42,73,0.12)_0%,transparent_75%)] blur-md"
        />

        <Image
          src={founder.portraitSrc}
          alt={founder.portraitAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-bottom transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
          priority
        />

        {/* Ambient subtle light wash & top boundary protection */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#E5EAF1]/70"
        />

        {/* Top Floating Designation Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5EAF1]/90 bg-[#FFFFFF]/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#315EAB] backdrop-blur-md shadow-[0_2px_8px_-2px_rgba(20,42,73,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#315EAB]" />
            {founder.id === "ayush-pardeshi" ? "Leadership" : "Architecture"}
          </span>
        </div>
      </div>

      {/* Content Layout */}
      <div className="flex flex-1 flex-col justify-between p-7 sm:p-9">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#315EAB]">
            {founder.designation}
          </p>

          <h2 className="font-display mt-2 text-[28px] sm:text-[32px] font-medium tracking-[-0.025em] text-[#101C32]">
            {founder.name}
          </h2>

          {/* Interactive Modern Contacts Strip */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {/* LinkedIn Handle Button with Hover Animation */}
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${founder.name} on LinkedIn`}
              className="group/btn inline-flex items-center gap-2 rounded-full border border-[#E5EAF1] bg-[#FAFBFD] px-3.5 py-2 text-[13px] font-medium text-[#142A49] shadow-[0_2px_6px_-2px_rgba(20,42,73,0.06)] transition-all duration-300 hover:border-[#0077B5] hover:bg-[#0077B5] hover:text-white hover:shadow-[0_4px_14px_-3px_rgba(0,119,181,0.45)] hover:-translate-y-0.5"
            >
              <LinkedInIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:scale-110" />
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:opacity-100" />
            </a>

            {/* Direct Phone Call / Dial Button */}
            <a
              href={`tel:+91${founder.phoneRaw}`}
              aria-label={`Call ${founder.name} at ${founder.phone}`}
              className="group/phone inline-flex items-center gap-2 rounded-full border border-[#E5EAF1] bg-[#FAFBFD] px-3.5 py-2 text-[13px] font-medium text-[#142A49] shadow-[0_2px_6px_-2px_rgba(20,42,73,0.06)] transition-all duration-300 hover:border-[#315EAB] hover:bg-[#EFF4FB] hover:text-[#315EAB] hover:-translate-y-0.5"
            >
              <Phone className="h-3.5 w-3.5 text-[#315EAB] transition-transform duration-300 group-hover/phone:rotate-12" />
              <span>{founder.phone}</span>
            </a>

            {/* Copy Phone Number Quick Tool */}
            <button
              type="button"
              onClick={handleCopyPhone}
              title="Copy phone number"
              aria-label="Copy phone number"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5EAF1] bg-[#FAFBFD] text-[#536176] transition-all duration-300 hover:border-[#315EAB]/50 hover:bg-[#EFF4FB] hover:text-[#315EAB]"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          <div className="mt-6 border-t border-[#E5EAF1] pt-6">
            <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#536176]">
              Biography &amp; Focus
            </h3>
            <p className="mt-3 text-[15px] sm:text-[15.5px] leading-[1.75] text-[#536176]">
              {founder.biography}
            </p>
          </div>
        </div>

        {/* Personal Statement */}
        <blockquote className="mt-8 flex min-h-[126px] flex-col justify-start rounded-2xl border border-[#E5EAF1] bg-[#FAFBFD] p-5 transition-colors duration-300 group-hover:border-[#DCE6F5] group-hover:bg-[#EFF4FB]/40">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#315EAB]">
            Personal Statement
          </p>
          <p className="mt-2.5 text-[14px] sm:text-[14.5px] leading-[1.7] text-[#142A49]">
            &ldquo;{founder.statement}&rdquo;
          </p>
        </blockquote>
      </div>
    </motion.article>
  );
}
