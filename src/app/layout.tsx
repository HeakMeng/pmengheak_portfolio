import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex, JetBrains_Mono, Viga } from "next/font/google";
import { MotionProvider } from "@/components/Motion";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

const sans = Google_Sans_Flex({ variable: "--font-gsans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const display = Viga({ variable: "--font-viga", subsets: ["latin"], weight: "400" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F5F9" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1426" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pmengheak.vercel.app"),
  title: "Pheng Mengheak | Backend Developer & AI Engineer",
  description:
    "Backend Developer and AI Engineer building Java & Spring Boot microservices, secure OAuth2/Keycloak APIs, Kafka-driven systems, and local LLM & RAG pipelines with PostgreSQL and Docker.",
  alternates: { canonical: "/" },
  // og:image comes from app/opengraph-image.tsx; X/Twitter falls back to it.
  openGraph: {
    title: "Pheng Mengheak | Backend Developer & AI Engineer",
    description: "Spring Boot microservices, secure APIs, distributed systems, and local AI.",
    url: "/",
    siteName: "Pheng Mengheak",
    locale: "en_US",
    type: "profile",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-theme is corrected before first paint by THEME_SCRIPT (saved choice, else OS preference).
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${display.variable} scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="paper min-h-svh overflow-x-clip font-sans text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
