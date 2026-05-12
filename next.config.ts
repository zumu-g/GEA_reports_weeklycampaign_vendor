import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  serverExternalPackages: ["pdfjs-dist", "pdf-parse"],
  async headers() {
    return [
      {
        // Allow the service worker to control the /vendor/ scope
        source: "/sw.js",
        headers: [
          { key: "Service-Worker-Allowed", value: "/vendor/" },
          { key: "Cache-Control", value: "no-cache" },
        ],
      },
    ];
  },
};

export default nextConfig;
