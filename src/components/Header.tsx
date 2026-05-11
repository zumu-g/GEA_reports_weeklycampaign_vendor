"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary border-b border-border/20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex items-center justify-between h-14">

          {/* Logo + wordmark */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-display font-semibold text-primary text-sm leading-none">G</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-white text-base leading-tight">
                Grants Estate Agents
              </span>
              <span className="text-xs text-accent/70 tracking-wide leading-tight">
                Vendor Reports
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-white/70 hover:text-white transition-colors duration-150"
            >
              Dashboard
            </Link>
            <Link
              href="/generate"
              className="rounded-full px-5 py-2 text-sm font-medium bg-accent text-primary hover:bg-accent-light transition-all duration-150"
            >
              Generate Report
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}
