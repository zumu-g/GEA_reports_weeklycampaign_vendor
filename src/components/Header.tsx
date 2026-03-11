"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-border-light sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-white text-[10px] font-bold tracking-tight">GEA</span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              Vendor Portal
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-muted hover:text-foreground transition-colors duration-200">
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
