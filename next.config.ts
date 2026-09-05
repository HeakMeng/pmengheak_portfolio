import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
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
          "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' blob: data: https:",
          "font-src 'self' data: https:",
          "connect-src 'self' ws: wss: https:",
          "frame-ancestors 'self'",
        ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspDirectives,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
