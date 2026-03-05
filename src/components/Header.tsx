"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-primary text-lg">
              GEA
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Grants Estate Agents</h1>
              <p className="text-xs text-accent-light">Weekly Campaign Reports</p>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="hover:text-accent transition-colors">
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
