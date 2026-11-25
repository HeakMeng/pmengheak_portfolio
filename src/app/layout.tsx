import type { Metadata, Viewport } from "next";
import { Caveat, Lexend } from "next/font/google";
import { MotionProvider } from "@/components/Motion";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

// Lexend: heavy geometric display and readable body. Caveat: the handwritten notes and doodle labels.
const sans = Lexend({ variable: "--font-lexend", subsets: ["latin"] });
const hand = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#D6ECFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1533" },
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
      className={`${sans.variable} ${hand.variable} scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="sky min-h-svh overflow-x-clip font-sans text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
