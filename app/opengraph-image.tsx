import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} – målare i Eslöv`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Delningsbild för sociala medier. Byt gärna mot ett riktigt foto (lägg en opengraph-image.jpg i /app). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#ffffff",
          color: "#0d1b2a",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.se"}/images/logo.png`} alt="" width={200} height={60} style={{ display: "flex", objectFit: "contain" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#4a5565", letterSpacing: 4, textTransform: "uppercase" }}>
            {`Målare i Eslöv · sedan ${site.founded}`}
          </div>
          <div style={{ fontSize: 100, fontWeight: 700, lineHeight: 1.05, marginTop: 16, letterSpacing: -3 }}>
            {site.shortName}
          </div>
          <div style={{ fontSize: 38, marginTop: 20, color: "#4a5565" }}>Måleri & fastighetsservice i Mellanskåne</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#12304f" }}>
          Fast pris efter kostnadsfritt hembesök · ROT-avdrag
        </div>
      </div>
    ),
    size,
  );
}
