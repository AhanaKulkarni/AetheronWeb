import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  AETHERBUILT_WEBSITE_URL,
  COMPANY_INFO,
  NAV_ITEMS,
  isConfiguredValue,
  isExternalConfiguredUrl,
} from "@/config/company";
import { AetheronLogo } from "./AetheronLogo";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  const hasExternalAetherBuilt = isExternalConfiguredUrl(
    AETHERBUILT_WEBSITE_URL
  );
  const hasOfficialEmail = isConfiguredValue(COMPANY_INFO.officialEmail);

  return (
    <footer className="border-t border-[#E5EAF1] bg-[#FFFFFF]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Identity */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <AetheronLogo showSublabel />
            </Link>
            <p className="mt-5 max-w-md text-[14.5px] leading-[1.7] text-[#536176]">
              {COMPANY_INFO.shortDescription}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h2 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#536176]">
              Navigation
            </h2>
            <ul className="mt-4 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[14px] font-medium text-[#101C32] transition-colors duration-200 hover:text-[#315EAB]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                {hasExternalAetherBuilt ? (
                  <a
                    href={AETHERBUILT_WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#315EAB] transition-colors duration-200 hover:text-[#142A49]"
                  >
                    <span>AetherBuilt</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    href="/#aetherbuilt"
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#315EAB] transition-colors duration-200 hover:text-[#142A49]"
                  >
                    <span>AetherBuilt</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </li>
            </ul>
          </div>

          {/* Corporate Reference */}
          <div className="lg:col-span-4">
            <h2 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#536176]">
              Corporate Information
            </h2>
            <dl className="mt-4 space-y-4 text-[14px]">
              <div>
                <dt className="text-[12px] font-medium text-[#536176]">
                  Official Email
                </dt>
                <dd className="mt-1 font-medium text-[#101C32]">
                  {hasOfficialEmail ? (
                    <a
                      href={`mailto:${COMPANY_INFO.officialEmail}`}
                      className="transition-colors hover:text-[#315EAB]"
                    >
                      {COMPANY_INFO.officialEmail}
                    </a>
                  ) : (
                    <span className="text-[#536176]">
                      {COMPANY_INFO.officialEmail}
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] font-medium text-[#536176]">
                  Registered Office
                </dt>
                <dd className="mt-1 leading-[1.6] text-[#101C32]">
                  {COMPANY_INFO.registeredOffice}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] font-medium text-[#536176]">
                  Direct Founder Contacts
                </dt>
                <dd className="mt-1 space-y-1 text-[13px] text-[#101C32]">
                  <div>
                    <span className="font-medium">Ayush Pardeshi:</span>{" "}
                    <a href="tel:+918766536270" className="hover:text-[#315EAB]">
                      +91 8766536270
                    </a>
                  </div>
                  <div>
                    <span className="font-medium">Ahana Kulkarni:</span>{" "}
                    <a href="tel:+918928352406" className="hover:text-[#315EAB]">
                      +91 8928352406
                    </a>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[#E5EAF1] pt-8 text-[13px] text-[#536176] sm:flex-row sm:items-center">
          <p>
            © <CurrentYear /> {COMPANY_INFO.legalName}. All rights reserved.
          </p>
          <p className="text-[12.5px] text-[#536176]/85">
            Engineering intelligence with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
