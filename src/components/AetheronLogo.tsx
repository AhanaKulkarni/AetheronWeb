import Image from "next/image";
import { COMPANY_INFO } from "@/config/company";

interface AetheronLogoProps {
  className?: string;
  showSublabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function AetheronLogo({
  className = "",
  showSublabel = false,
  size = "md",
}: AetheronLogoProps) {
  const markDimensions =
    size === "sm" ? { w: 32, h: 32 } : size === "lg" ? { w: 48, h: 48 } : { w: 38, h: 38 };

  return (
    <span className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Official 3D Prism Emblem with Glass Frame */}
      <span className="relative flex items-center justify-center shrink-0 rounded-xl overflow-hidden border border-[#E5EAF1] bg-[#FFFFFF] shadow-[0_2px_8px_-2px_rgba(20,42,73,0.08)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:border-[#315EAB]/40 group-hover:shadow-[0_4px_16px_-4px_rgba(49,94,171,0.2)]">
        <Image
          src={COMPANY_INFO.emblemSrc}
          alt="Aetheron.AI Emblem"
          width={markDimensions.w}
          height={markDimensions.h}
          className="object-contain p-0.5"
          priority
        />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-semibold tracking-[-0.025em] text-[#101C32] ${
            size === "sm"
              ? "text-[14px]"
              : size === "lg"
              ? "text-[18px]"
              : "text-[16px] sm:text-[17px]"
          }`}
        >
          Aetheron
          <span className="text-[#315EAB]">.AI</span>
        </span>
        {showSublabel && (
          <span className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#536176]">
            Technologies Pvt. Ltd.
          </span>
        )}
      </span>
    </span>
  );
}
