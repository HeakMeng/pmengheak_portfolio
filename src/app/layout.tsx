import type { Metadata, Viewport } from "next";
import { Caveat, JetBrains_Mono, Space_Grotesk, VT323 } from "next/font/google";
import { MotionProvider } from "@/components/Motion";
import "./globals.css";

const sans = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const pixel = VT323({ variable: "--font-vt323", subsets: ["latin"], weight: "400" });
const hand = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: "600" });

export const viewport: Viewport = {
  themeColor: "#f4f6fa",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pmengheak.vercel.app"),
  title: "Pheng Mengheak | Backend Engineer",
  description:
    "Backend Engineer building Java & Spring Boot microservices, secure REST APIs, and distributed systems with PostgreSQL and Docker.",
  openGraph: {
    title: "Pheng Mengheak | Backend Engineer",
    description: "Spring Boot microservices, secure APIs, and distributed systems.",
    siteName: "Pheng Mengheak",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${pixel.variable} ${hand.variable} scroll-smooth`}>
      <body className="dot-mesh min-h-svh overflow-x-clip font-sans text-slate-900 antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
