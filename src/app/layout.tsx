import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GEA - Weekly Campaign & Vendor Reports",
  description: "Grants Estate Agents - Campaign Performance Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1A1814" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="GEA Portal" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
