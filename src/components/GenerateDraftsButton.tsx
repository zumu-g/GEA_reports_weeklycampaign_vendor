"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface GenerateDraftsButtonProps {
  weekEnding: string;
}

export default function GenerateDraftsButton({ weekEnding }: GenerateDraftsButtonProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ created: number; skipped: number } | null>(null);
  const router = useRouter();

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/weekly-drafts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekEnding }),
      });
      const data = await res.json();
      setResult({ created: data.created ?? 0, skipped: data.skipped ?? 0 });
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {result && (
        <span className="font-body text-xs text-muted">
          {result.created} created{result.skipped > 0 ? `, ${result.skipped} already exist` : ""}
        </span>
      )}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="h-9 rounded-full px-4 font-body text-sm font-medium bg-accent text-primary hover:bg-accent/80 disabled:opacity-50 disabled:cursor-wait transition-all whitespace-nowrap"
      >
        {loading ? "Generating…" : "Generate This Week's Drafts"}
      </button>
    </div>
  );
}
