/**
 * Centralized corporate configuration for Aetheron.AI Technologies Private Limited.
 * Official brand assets, verified founder profiles, contact details, and product references.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://aetheron.ai";

/**
 * Dedicated website URL for AetherBuilt.
 */
export const AETHERBUILT_WEBSITE_URL =
  process.env.NEXT_PUBLIC_AETHERBUILT_URL || "https://aetherbuilt.com";

export function isExternalConfiguredUrl(url: string): boolean {
  return /^https?:\/\//i.test(url.trim());
}

export function isConfiguredValue(value: string): boolean {
  return !value.trim().startsWith("[INSERT");
}

export const COMPANY_INFO = {
  legalName: "Aetheron.AI Technologies Private Limited",
  shortName: "Aetheron.AI",
  positioningStatement:
    "Engineering intelligence for a world that never stops evolving.",
  heroDescription:
    "We build intelligent technology, AI-powered systems, and software that transform complex operational challenges into dependable real-world platforms — anchored by our flagship manufacturing operating system, AetherBuilt.",
  shortDescription:
    "An intelligent technology company building advanced software systems, AI-native platforms, and AetherBuilt — our flagship operating system for modern industrial manufacturing.",
  logoSrc: "/images/brand/aetheron-logo.png",
  emblemSrc: "/images/brand/aetheron-emblem.png",
  registeredOffice:
    process.env.NEXT_PUBLIC_REGISTERED_OFFICE ||
    "[INSERT OFFICIAL REGISTERED OFFICE ADDRESS]",
  officialEmail:
    process.env.NEXT_PUBLIC_COMPANY_EMAIL ||
    "[INSERT OFFICIAL EMAIL ADDRESS]",
  officialPhone:
    process.env.NEXT_PUBLIC_COMPANY_PHONE ||
    "+91 8766536270 / +91 8928352406",
} as const;

export interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/#hero", sectionId: "hero" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "What We Build", href: "/#what-we-build", sectionId: "what-we-build" },
  { label: "Founders", href: "/founders" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export interface FocusArea {
  index: string;
  title: string;
  summary: string;
  discipline: string;
}

export const FOCUS_AREAS: FocusArea[] = [
  {
    index: "01",
    title: "Artificial Intelligence & Machine Learning",
    summary:
      "Designing applied intelligence models and decision architectures tailored to real-world operational complexity.",
    discipline: "Core Intelligence",
  },
  {
    index: "02",
    title: "Intelligent Software Systems",
    summary:
      "Engineering resilient, modular software platforms that unify fragmented workflows into clear, dependable systems.",
    discipline: "Systems Engineering",
  },
  {
    index: "03",
    title: "Industrial Technology & Automation",
    summary:
      "Bringing operational visibility, connected coordination, and intelligent automation to physical and manufacturing environments.",
    discipline: "Industrial Platforms",
  },
  {
    index: "04",
    title: "Computer Vision & Intelligent Applications",
    summary:
      "Building perceptive software capable of interpreting visual context and turning observation into structured action.",
    discipline: "Applied Perception",
  },
  {
    index: "05",
    title: "Immersive and Next-Generation Digital Experiences",
    summary:
      "Crafting intuitive interfaces and responsive digital environments where complex intelligence feels effortless to use.",
    discipline: "Human Interaction",
  },
];

export const AETHERBUILT_DETAILS = {
  label: "Aetheron Flagship Product",
  name: "AetherBuilt",
  tagline: "The AI-Native Operating System for Manufacturing",
  description:
    "AetherBuilt is an AI-native manufacturing operating system that brings production, machines, inventory, procurement, workforce, and factory operations into one connected platform.",
  supportingLine:
    "Engineered to help industrial manufacturers replace fragmented point tools with a unified control room for operational visibility, machine telemetry, and autonomous workflow coordination.",
  ctaLabel: "Explore AetherBuilt",
  domains: [
    "Production",
    "Orders",
    "Machines",
    "Inventory",
    "Procurement",
    "Vendors",
  ],
} as const;

export interface Founder {
  id: string;
  name: string;
  designation: string;
  initials: string;
  phone: string;
  phoneRaw: string;
  linkedin: string;
  portraitSrc: string;
  portraitAlt: string;
  biography: string;
  statement: string;
}

export const FOUNDERS: Founder[] = [
  {
    id: "ayush-pardeshi",
    name: "Ayush Pardeshi",
    designation: "Founder & Managing Director",
    initials: "AP",
    phone: "+91 8766536270",
    phoneRaw: "8766536270",
    linkedin: "https://www.linkedin.com/in/ayush-pardeshi-8b76b4285/",
    portraitSrc: "/images/founders/ayush-pardeshi.png",
    portraitAlt:
      "Portrait of Ayush Pardeshi, Founder & Managing Director at Aetheron.AI Technologies Private Limited",
    biography:
      "Ayush Pardeshi directs the strategic vision, venture trajectory, and product direction at Aetheron.AI Technologies Private Limited. Operating at the intersection of applied artificial intelligence, industrial automation, and enterprise software architecture, Ayush leads the company's ambition to build scalable, mission-critical systems that solve fundamental operational challenges.",
    statement:
      "The goal is not to invent complexity, but to engineer intelligent systems that bring structure, predictability, and lasting clarity to how the modern world works.",
  },
  {
    id: "ahana-kulkarni",
    name: "Ahana Kulkarni",
    designation: "Co-Founder & Technical Director",
    initials: "AK",
    phone: "+91 8928352406",
    phoneRaw: "8928352406",
    linkedin: "https://www.linkedin.com/in/ahana-kulkarni-753939272",
    portraitSrc: "/images/founders/ahana-kulkarni.png",
    portraitAlt:
      "Portrait of Ahana Kulkarni, Co-Founder & Technical Director at Aetheron.AI Technologies Private Limited",
    biography:
      "Ahana Kulkarni spearheads the engineering architecture, deep-technology research, and core software systems at Aetheron.AI Technologies Private Limited. Bringing rigorous computational principles and systems engineering leadership, Ahana shapes the algorithms, platform backbones, and responsive user experiences that power Aetheron's technological solutions.",
    statement:
      "We build technology with mathematical precision, intentional design, and deep purpose — ensuring every model, architecture, and interface serves real-world human capability.",
  },
];

export interface StoryChapter {
  index: string;
  title: string;
  body: string;
}

export const FOUNDERS_STORY = {
  heading: "An idea. A belief. A journey.",
  lead: "Aetheron.AI Technologies Private Limited began with a shared conviction: that intelligent technology should do more than impress on a screen — it should bring clarity, precision, and lasting capability to the industries and people who rely on it.",
  chapters: [
    {
      index: "I",
      title: "Where the vision took shape",
      body: "Recognizing that modern manufacturing and enterprise operations were drowning in fragmented tools, disconnected spreadsheets, and superficial dashboards, Ayush Pardeshi and Ahana Kulkarni united their complementary disciplines — strategic product leadership and technical systems architecture — to establish a new kind of engineering-first technology company.",
    },
    {
      index: "II",
      title: "A shared belief in purposeful engineering",
      body: "From the outset, Aetheron was envisioned not around short-lived hype, but around foundational engineering — combining artificial intelligence, thoughtful software architecture, and human-centered design so that complex systems become clear, dependable, and actionable in real-world operations.",
    },
    {
      index: "III",
      title: "Building forward with AetherBuilt",
      body: "Today, that shared vision comes to life through continuous engineering innovation and platforms like AetherBuilt — empowering enterprises to move beyond silos and operate with synchronized intelligence, total transparency, and unwavering confidence.",
    },
  ] satisfies StoryChapter[],
};

export const INQUIRY_TOPICS = [
  "General Inquiry",
  "Product Inquiry",
  "Partnership",
  "Project Collaboration",
  "Investment",
  "Other",
] as const;

export type InquiryTopic = (typeof INQUIRY_TOPICS)[number];
