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
      <body className="antialiased">{children}</body>
    </html>
  );
}
