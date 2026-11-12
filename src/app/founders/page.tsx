import type { Metadata } from "next";
import { COMPANY_INFO, FOUNDERS } from "@/config/company";
import { FounderProfile } from "@/components/FounderProfile";
import { FoundersStory } from "@/components/FoundersStory";
import { EditorialReveal, Reveal } from "@/components/MotionPrimitives";

export const metadata: Metadata = {
  title: "Founders",
  description:
    "Meet Ayush Pardeshi (Founder & Managing Director) and Ahana Kulkarni (Co-Founder & Technical Director) behind Aetheron.AI Technologies Private Limited.",
  alternates: {
    canonical: "/founders",
  },
  openGraph: {
    title: `Founders | ${COMPANY_INFO.legalName}`,
    description:
      "Every company begins with an idea. Meet the founders building Aetheron.AI Technologies Private Limited.",
    url: "/founders",
  },
};

export default function FoundersPage() {
  return (
    <div className="bg-[#FAFBFD]">
      {/* Founders Hero */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24">
        <div
          aria-hidden="true"
          className="bg-architectural-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_30%,#000_40%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(125,168,234,0.18)_0%,rgba(239,244,251,0.45)_50%,rgba(250,251,253,0)_75%)] blur-2xl"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-10">
          <Reveal y={14}>
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#315EAB]">
              Leadership &amp; Vision
            </p>
          </Reveal>

          <h1 className="font-display mt-5 text-[clamp(2.5rem,5.2vw,4.5rem)] font-medium leading-[1.06] tracking-[-0.035em] text-[#101C32]">
            <EditorialReveal immediate delay={0.08}>
              <span className="text-gradient-navy">Behind Aetheron.</span>
            </EditorialReveal>
          </h1>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-[16.5px] sm:text-[18.5px] leading-[1.7] text-[#536176]">
              Every company begins with an idea. Ours is being built by people
              who believe in turning ambitious ideas into meaningful technology.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Equal Side-by-Side Founders Presentation */}
      <section
        aria-label="Founders of Aetheron.AI Technologies Private Limited"
        className="relative pb-24 sm:pb-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:gap-12">
            {FOUNDERS.map((founder) => (
              <FounderProfile key={founder.id} founder={founder} />
            ))}
          </div>
        </div>
      </section>

      {/* Founders' Story */}
      <FoundersStory />
    </div>
  );
}
