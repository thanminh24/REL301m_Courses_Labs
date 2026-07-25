import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return {
    name: "REL301m Study Studio",
    short_name: "REL301m",
    description:
      "Offline-ready study tools for all 317 canonical REL301m questions.",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#f6f3ea",
    theme_color: "#1c3d35",
    orientation: "any",
    icons: [
      {
        src: `${basePath}/icons/icon-192.svg`,
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-512.svg`,
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
