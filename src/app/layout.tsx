import type { Metadata, Viewport } from "next";
import { Martian_Mono, Schibsted_Grotesk, Viga } from "next/font/google";
import "./globals.css";

// Viga ships a single weight (400); headings never synthesize bold (see globals.css).
const display = Viga({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const body = Schibsted_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = Martian_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#F5F7FB",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pmengheak.vercel.app"),
  title: "Pheng Mengheak | Backend Engineer",
  description: "Backend Engineer building Spring Boot microservices, secure APIs, and local AI systems with Java, Docker, PostgreSQL, and MongoDB.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pheng Mengheak | Backend Engineer",
    description: "Spring Boot microservices, secure APIs, and local AI systems.",
    url: "https://pmengheak.vercel.app",
    siteName: "Pheng Mengheak",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "Pheng Mengheak Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pheng Mengheak | Backend Engineer",
    description: "Spring Boot microservices, secure APIs, and local AI systems.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} scroll-smooth`}>
      <body className="bg-bg text-fg font-sans antialiased overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
