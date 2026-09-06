import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-[#F8FAFC] text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-[#FF5722] selection:text-white">
        {children}
      </body>
    </html>
  );
}
