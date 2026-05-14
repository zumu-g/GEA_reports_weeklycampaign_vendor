'use client';

import { useState } from 'react';

export default function ShareButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/vendor/${token}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded px-3 py-1 text-xs font-medium font-body border transition-all duration-300 whitespace-nowrap ${
        copied
          ? 'bg-success/8 text-success border-success/25'
          : 'bg-surface text-foreground border-border hover:border-accent hover:text-accent'
      }`}
    >
      {copied ? '✓ Copied' : 'Share'}
    </button>
  );
}
