import { ImageResponse } from "next/og";
import { COMPANY_INFO } from "@/config/company";

export const alt = `${COMPANY_INFO.legalName} — ${COMPANY_INFO.positioningStatement}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          background:
            "linear-gradient(135deg, #FAFBFD 0%, #FFFFFF 48%, #EFF4FB 100%)",
          color: "#101C32",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              border: "1.5px solid #DCE6F5",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 700,
              color: "#315EAB",
            }}
          >
            A
          </div>
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#315EAB",
              fontWeight: 600,
            }}
          >
            Aetheron.AI
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "58px",
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#142A49",
            }}
          >
            <span>AETHERON.AI TECHNOLOGIES</span>
            <span>PRIVATE LIMITED</span>
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.4,
              color: "#536176",
              maxWidth: "880px",
            }}
          >
            {COMPANY_INFO.positioningStatement}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #E5EAF1",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#536176",
          }}
        >
          <span>Intelligent Software &amp; AI Systems</span>
          <span style={{ color: "#315EAB", fontWeight: 500 }}>aetheron.ai</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
