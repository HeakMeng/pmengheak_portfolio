import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    // In local development, ensure script-src permits Next.js scripts and Turbopack
    const cspDirectives = isDev
      ? [
          "default-src 'self' * 'unsafe-inline' 'unsafe-eval' data: blob:",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline' * data: blob:",
          "style-src 'self' 'unsafe-inline' *",
          "img-src 'self' blob: data: *",
          "font-src 'self' data: *",
          "connect-src 'self' ws: wss: http: https: *",
          "frame-ancestors 'self' *",
        ].join("; ")
      : [
          "default-src 'self'",
          // 'unsafe-inline' stays for the pre-paint theme script and Next's inline hydration data; eval is dev-only.
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' blob: data: https:",
          "font-src 'self' data: https:",
          "connect-src 'self' ws: wss: https:",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
        ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspDirectives,
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
