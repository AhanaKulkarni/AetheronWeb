import { Suspense } from "react";
import { Building2, Mail, Phone } from "lucide-react";
import { COMPANY_INFO, FOUNDERS, isConfiguredValue } from "@/config/company";
import { ContactForm } from "./ContactForm";
import { EditorialReveal, Reveal } from "./MotionPrimitives";

function LinkedInSmallIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function ContactSection() {
  const hasEmail = isConfiguredValue(COMPANY_INFO.officialEmail);

  return (
    <section
      id="contact"
      className="relative border-t border-[#E5EAF1] bg-[#FAFBFD] py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Column — Narrative, Direct Founder Cards & Registered Office */}
          <div className="lg:col-span-5">
            <Reveal y={14}>
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#315EAB]">
                04 / Contact
              </p>
            </Reveal>

            <h2 className="font-display mt-5 text-[clamp(2.1rem,3.8vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#101C32]">
              <EditorialReveal delay={0.05}>
                <span>Have something in mind?</span>
              </EditorialReveal>
            </h2>

            <Reveal delay={0.14}>
              <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.75] text-[#536176]">
                Whether you&apos;re exploring our technology, looking to
                collaborate, or simply want to start a conversation, we&apos;d
                love to hear from you.
              </p>
            </Reveal>

            {/* Direct Founder Contact Cards */}
            <Reveal delay={0.2} className="mt-8">
              <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#536176]">
                Direct Founder Contacts
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {FOUNDERS.map((founder) => (
                  <div
                    key={founder.id}
                    className="group relative rounded-2xl border border-[#E5EAF1] bg-[#FFFFFF] p-4 shadow-[0_4px_16px_-6px_rgba(20,42,73,0.06)] transition-all duration-300 hover:border-[#315EAB]/40 hover:shadow-[0_8px_24px_-8px_rgba(49,94,171,0.18)] hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-[#101C32]">
                        {founder.name}
                      </span>
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${founder.name} LinkedIn`}
                        className="text-[#536176] transition-colors hover:text-[#0077B5]"
                      >
                        <LinkedInSmallIcon className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="mt-0.5 text-[11px] font-medium text-[#315EAB]">
                      {founder.designation}
                    </p>
                    <a
                      href={`tel:+91${founder.phoneRaw}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#536176] transition-colors hover:text-[#315EAB]"
                    >
                      <Phone className="h-3 w-3 text-[#315EAB]" />
                      <span>{founder.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Corporate Registered Office & Info */}
            <Reveal delay={0.26}>
              <div className="mt-8 divide-y divide-[#E5EAF1] border-t border-b border-[#E5EAF1]">
                <div className="flex items-start gap-4 py-4">
                  <Building2
                    className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#315EAB]"
                    strokeWidth={1.75}
                  />
                  <div>
                    <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#536176]">
                      Registered Office
                    </h3>
                    <p className="mt-1 text-[14px] leading-[1.65] text-[#101C32]">
                      {COMPANY_INFO.registeredOffice}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-4">
                  <Mail
                    className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#315EAB]"
                    strokeWidth={1.75}
                  />
                  <div>
                    <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#536176]">
                      Official Email
                    </h3>
                    <p className="mt-1 text-[14px] text-[#101C32]">
                      {hasEmail ? (
                        <a
                          href={`mailto:${COMPANY_INFO.officialEmail}`}
                          className="font-medium transition-colors hover:text-[#315EAB]"
                        >
                          {COMPANY_INFO.officialEmail}
                        </a>
                      ) : (
                        <span className="text-[#536176]">
                          {COMPANY_INFO.officialEmail}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column — Functional Inquiry Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.14} y={24}>
              <Suspense
                fallback={
                  <div className="h-[540px] rounded-[26px] border border-[#E5EAF1] bg-[#FFFFFF] p-10" />
                }
              >
                <ContactForm />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
