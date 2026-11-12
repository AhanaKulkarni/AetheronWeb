import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { Philosophy } from "@/components/Philosophy";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <WhatWeBuild />
      <Philosophy />
      <ContactSection />
    </>
  );
}
