import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/app-shell";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { StudyProvider } from "@/domain/progress/study-provider";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: {
    default: "REL301m Study Studio",
    template: "%s · REL301m",
  },
  description:
    "Master all 317 canonical REL301m questions with evidence-aware explanations, flashcards, adaptive learn, match, and tests.",
  applicationName: "REL301m Study Studio",
  manifest: `${basePath}/manifest.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: "#1c3d35",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StudyProvider>
          <AppShell>{children}</AppShell>
          <ServiceWorkerRegistration />
        </StudyProvider>
      </body>
    </html>
  );
}
