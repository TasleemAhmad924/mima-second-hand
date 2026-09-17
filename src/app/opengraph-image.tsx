import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} – Second-Hand-Laden in ${siteConfig.city}`;

export default function OpengraphImage() {
  const eyebrow = `Second-Hand-Laden · Mietregale · ${siteConfig.city}`;
  const location = `Dein Second-Hand-Laden in ${siteConfig.city}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F5F1",
          color: "#292725",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#4A3A32",
          }}
        >
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 168,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            MiMa
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 40,
              color: "#5C534C",
            }}
          >
            Lieblingsstücke. Neu entdeckt.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#5C534C",
          }}
        >
          <span style={{ display: "flex" }}>{location}</span>
          <span
            style={{
              width: 64,
              height: 8,
              background: "#CEBBA9",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
