import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const ogImageSize = { width: 1200, height: 630 };

/** Shared renderer for the site's social share image (OpenGraph + Twitter). */
export async function renderBrandOgImage() {
  const logoData = await readFile(
    join(process.cwd(), "public", "esslogo-light.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          backgroundColor: "#090d12",
          backgroundImage:
            "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.07), rgba(9,13,18,0) 60%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={440} height={141} alt="" />
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 500,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: -0.5,
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 600,
            color: "#f09d2f",
            textTransform: "uppercase",
            letterSpacing: 6,
          }}
        >
          WHS Consulting — New South Wales
        </div>
      </div>
    ),
    ogImageSize,
  );
}
