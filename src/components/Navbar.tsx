"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_ITEMS } from "@/config/company";
import { AetheronLogo } from "./AetheronLogo";
import { AETHERON_EASE } from "./MotionPrimitives";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["hero", "about", "what-we-build", "philosophy", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isNavItemActive = (href: string, sectionId?: string) => {
    if (href === "/founders") {
      return pathname === "/founders";
    }
    if (pathname !== "/") {
      return false;
    }
    return activeSection === sectionId;
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId?: string
  ) => {
    setMobileOpen(false);
    if (pathname === "/" && sectionId && href.startsWith("/#")) {
      const target = document.getElementById(sectionId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(sectionId);
        window.history.replaceState(null, "", `#${sectionId}`);
      }
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled || mobileOpen
          ? "bg-[#FFFFFF]/88 backdrop-blur-xl border-b border-[#E5EAF1] shadow-[0_6px_30px_-14px_rgba(20,42,73,0.08)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          onClick={(e) => {
            setMobileOpen(false);
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("hero");
            }
          }}
          className="rounded-lg focus-visible:outline-none"
          aria-label="Aetheron.AI Technologies Private Limited — Home"
        >
          <AetheronLogo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const active = isNavItemActive(item.href, item.sectionId);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href, item.sectionId)}
                className={`relative px-4 py-2 text-[14px] font-medium tracking-[-0.01em] transition-colors duration-300 ${
                  active
                    ? "text-[#142A49]"
                    : "text-[#536176] hover:text-[#101C32]"
                }`}
              >
                <span>{item.label}</span>
                {active && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ duration: 0.45, ease: AETHERON_EASE }}
                    className="absolute inset-x-4 -bottom-0.5 h-[1.5px] rounded-full bg-gradient-to-r from-[#142A49] via-[#315EAB] to-[#5D8DE0]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            onClick={(e) => handleAnchorClick(e, "/#contact", "contact")}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#E5EAF1] bg-[#FFFFFF]/90 px-5 py-2.5 text-[13.5px] font-medium text-[#142A49] shadow-[0_2px_10px_-4px_rgba(20,42,73,0.08)] transition-all duration-300 hover:border-[#315EAB]/40 hover:bg-[#EFF4FB] hover:text-[#315EAB]"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5EAF1] bg-[#FFFFFF]/90 text-[#142A49] transition-colors hover:bg-[#EFF4FB] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-4.5 w-4.5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-4.5 w-4.5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: AETHERON_EASE }}
            className="overflow-hidden border-t border-[#E5EAF1] bg-[#FFFFFF]/96 backdrop-blur-xl lg:hidden"
          >
            <nav
              aria-label="Mobile Navigation"
              className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-6"
            >
              {NAV_ITEMS.map((item, idx) => {
                const active = isNavItemActive(item.href, item.sectionId);
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: idx * 0.04,
                      ease: AETHERON_EASE,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) =>
                        handleAnchorClick(e, item.href, item.sectionId)
                      }
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[16px] font-medium transition-colors ${
                        active
                          ? "bg-[#EFF4FB] text-[#142A49]"
                          : "text-[#536176] hover:bg-[#FAFBFD] hover:text-[#101C32]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#315EAB]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="mt-4 border-t border-[#E5EAF1] pt-4">
                <Link
                  href="/#contact"
                  onClick={(e) =>
                    handleAnchorClick(e, "/#contact", "contact")
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#142A49] px-5 py-3 text-[14.5px] font-medium text-white transition-colors hover:bg-[#315EAB]"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
