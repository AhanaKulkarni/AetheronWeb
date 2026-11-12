"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FOUNDERS_STORY } from "@/config/company";
import { EditorialReveal, Reveal, StaggerGroup, StaggerItem } from "./MotionPrimitives";

export function FoundersStory() {
  return (
    <section className="relative border-t border-[#E5EAF1] bg-gradient-to-b from-[#FFFFFF] via-[#FAFBFD] to-[#EFF4FB]/60 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal y={14}>
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#315EAB]">
            Founding Story
          </p>
        </Reveal>

        <h2 className="font-display mt-5 text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#101C32]">
          <EditorialReveal delay={0.06}>
            <span>{FOUNDERS_STORY.heading}</span>
          </EditorialReveal>
        </h2>

        <Reveal delay={0.14}>
          <p className="font-display mt-8 text-[19px] sm:text-[22px] font-normal leading-[1.6] tracking-[-0.015em] text-[#142A49]">
            {FOUNDERS_STORY.lead}
          </p>
        </Reveal>

        {/* Editorial Chapters */}
        <StaggerGroup
          staggerDelay={0.1}
          className="mt-14 divide-y divide-[#E5EAF1] border-t border-b border-[#E5EAF1]"
        >
          {FOUNDERS_STORY.chapters.map((chapter) => (
            <StaggerItem key={chapter.index}>
              <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <span className="font-accent text-[12px] font-semibold uppercase tracking-[0.2em] text-[#315EAB]">
                    Chapter {chapter.index}
                  </span>
                  <h3 className="font-display mt-2 text-[21px] font-medium tracking-[-0.02em] text-[#101C32]">
                    {chapter.title}
                  </h3>
                </div>
                <div className="md:col-span-8">
                  <p className="text-[16px] sm:text-[16.5px] leading-[1.8] text-[#536176]">
                    {chapter.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Subtle Next Step Bridge */}
        <Reveal delay={0.15} className="mt-14">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-[#E5EAF1] bg-[#FFFFFF] p-8 sm:flex-row sm:items-center sm:p-10 shadow-[0_18px_48px_-28px_rgba(20,42,73,0.1)]">
            <div>
              <h3 className="font-display text-[22px] font-medium tracking-[-0.02em] text-[#101C32]">
                Explore what Aetheron is building.
              </h3>
              <p className="mt-1.5 text-[15px] text-[#536176]">
                Discover our engineering disciplines, AetherBuilt, or start a conversation with our team.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#what-we-build"
                className="inline-flex items-center gap-2 rounded-full border border-[#E5EAF1] bg-[#FAFBFD] px-5 py-3 text-[14px] font-medium text-[#142A49] transition-colors hover:border-[#315EAB]/40 hover:bg-[#EFF4FB]"
              >
                <span>What We Build</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#142A49] to-[#315EAB] px-6 py-3 text-[14px] font-medium text-white shadow-[0_8px_22px_-8px_rgba(49,94,171,0.5)] transition-all hover:brightness-105"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
