"use client";

import {
  EditorialReveal,
  Reveal,
  ScrollParallax,
  StaggerGroup,
  StaggerItem,
} from "./MotionPrimitives";
import { SystemsArchitectureVisual } from "./SystemsArchitectureVisual";

const ABOUT_PILLARS = [
  {
    title: "Who we are",
    description:
      "An engineering-led technology company dedicated to turning ambitious concepts into dependable intelligent systems.",
  },
  {
    title: "What drives our work",
    description:
      "A conviction that artificial intelligence and software architecture should clarify complex operations rather than complicate them.",
  },
  {
    title: "The problems we solve",
    description:
      "Fragmented workflows, disconnected tools, and operational bottlenecks across modern businesses and industrial environments.",
  },
] as const;

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-[#E5EAF1] bg-[#FFFFFF] py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-16">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-6">
            <Reveal y={14}>
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#315EAB]">
                01 / About Aetheron
              </p>
            </Reveal>

            <h2 className="font-display mt-5 text-[clamp(2rem,3.6vw,3.1rem)] font-medium leading-[1.12] tracking-[-0.03em] text-[#101C32]">
              <EditorialReveal delay={0.05}>
                <span>Technology with purpose.</span>
              </EditorialReveal>
              <EditorialReveal delay={0.14}>
                <span className="text-gradient-navy">
                  Intelligence with direction.
                </span>
              </EditorialReveal>
            </h2>

            <Reveal delay={0.18} className="mt-7 space-y-5">
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#101C32]/90">
                Aetheron.AI Technologies Private Limited is a technology company
                focused on building intelligent software, AI-powered solutions,
                and next-generation digital systems.
              </p>
              <p className="text-[15.5px] sm:text-[16.5px] leading-[1.75] text-[#536176]">
                We bring together engineering, artificial intelligence, and
                thoughtful design to solve meaningful problems and create
                technology that moves businesses forward.
              </p>
            </Reveal>

            {/* Hairline Editorial Pillars */}
            <StaggerGroup className="mt-10 divide-y divide-[#E5EAF1] border-t border-b border-[#E5EAF1]">
              {ABOUT_PILLARS.map((pillar) => (
                <StaggerItem key={pillar.title}>
                  <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-6">
                    <h3 className="sm:col-span-4 text-[13.5px] font-semibold tracking-[-0.01em] text-[#142A49]">
                      {pillar.title}
                    </h3>
                    <p className="sm:col-span-8 text-[14.5px] leading-[1.65] text-[#536176]">
                      {pillar.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          {/* Abstract Systems Visual Column */}
          <div className="lg:col-span-6">
            <ScrollParallax offset={22}>
              <Reveal delay={0.15} y={24}>
                <SystemsArchitectureVisual />
              </Reveal>
            </ScrollParallax>
          </div>
        </div>
      </div>
    </section>
  );
}
