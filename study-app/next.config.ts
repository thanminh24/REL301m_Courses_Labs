import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
if (basePath && !/^\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)*$/.test(basePath)) {
  throw new Error(
    "NEXT_PUBLIC_BASE_PATH must be empty or a slash-prefixed URL path without a trailing slash.",
  );
}

const serviceWorker = readFileSync(resolve(process.cwd(), "public/sw.js"), "utf8");
const cacheName = serviceWorker.match(
  /const CACHE_NAME = "(rel301m-study-[a-f0-9]+-[a-f0-9]+)";/,
)?.[1];

if (!cacheName) {
  throw new Error("Unable to derive the deterministic build ID from public/sw.js.");
}

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  generateBuildId: async () => cacheName,
};

export default nextConfig;
