import type { Metadata, Viewport } from "next";
import { Anton, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { MotionProvider } from "@/components/Motion";
import "./globals.css";

const sans = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const display = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });

export const viewport: Viewport = {
  themeColor: "#faf7f2",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pmengheak.vercel.app"),
  title: "Pheng Mengheak | Backend Developer",
  description:
    "Backend Developer building Java & Spring Boot microservices, secure REST APIs, and distributed systems with PostgreSQL and Docker.",
  openGraph: {
    title: "Pheng Mengheak | Backend Developer",
    description: "Spring Boot microservices, secure APIs, and distributed systems.",
    siteName: "Pheng Mengheak",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable} scroll-smooth`}>
      <body className="paper min-h-svh overflow-x-clip font-sans text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
