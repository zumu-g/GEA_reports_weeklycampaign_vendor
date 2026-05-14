"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary border-b border-border/20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex items-center justify-between h-14">

          {/* Logo + wordmark */}
          <Link href="/" className="flex items-center gap-4">
            <span className="font-display text-accent tracking-widest text-sm leading-none">GEA</span>
            <span className="w-px h-5 bg-white/20 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-body font-medium text-white text-sm leading-tight">
                Grants Estate Agents
              </span>
              <span className="font-body text-xs text-accent/70 tracking-widest leading-none uppercase">
                Vendor Reports
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="font-body text-sm text-white/70 hover:text-white transition-colors duration-150"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/onboard"
              className="font-body text-sm text-white/70 hover:text-white transition-colors duration-150"
            >
              New Property
            </Link>
            <Link
              href="/generate"
              className="font-body rounded px-5 py-2 text-sm font-medium border border-accent/50 text-accent hover:bg-accent/10 transition-colors duration-150"
            >
              Generate Report
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}
