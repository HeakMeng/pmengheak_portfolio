import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex, JetBrains_Mono, Viga } from "next/font/google";
import { MotionProvider } from "@/components/Motion";
import "./globals.css";

const sans = Google_Sans_Flex({ variable: "--font-gsans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const display = Viga({ variable: "--font-viga", subsets: ["latin"], weight: "400" });

export const viewport: Viewport = {
  themeColor: "#0B1426",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pmengheak.vercel.app"),
  title: "Pheng Mengheak | Backend Developer & AI Engineer",
  description:
    "Backend Developer and AI Engineer building Java & Spring Boot microservices, secure OAuth2/Keycloak APIs, Kafka-driven systems, and local LLM & RAG pipelines with PostgreSQL, Redis, and Docker.",
  openGraph: {
    title: "Pheng Mengheak | Backend Developer & AI Engineer",
    description: "Spring Boot microservices, secure APIs, distributed systems, and local AI.",
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
