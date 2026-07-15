import { renderBrandOgImage, ogImageSize } from "@/lib/og-image";
import { site } from "@/lib/site";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default async function Image() {
  return renderBrandOgImage();
}
