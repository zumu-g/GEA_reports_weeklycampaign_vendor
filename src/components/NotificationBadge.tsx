"use client";

import { useState, useEffect } from "react";

interface NotificationBadgeProps {
  slug: string;
}

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  timestamp: string;
  seen: boolean;
}

function typeIcon(type: string) {
  if (type.includes("analytics")) return "📊";
  if (type.includes("inspection")) return "🏠";
  if (type.includes("offer")) return "💰";
  if (type.includes("checklist")) return "✅";
  if (type.includes("milestone")) return "🎯";
  if (type.includes("report")) return "📋";
  return "🔔";
}

function timeAgo(timestamp: string): string {
  const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function NotificationBadge({ slug }: NotificationBadgeProps) {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unseenCount, setUnseenCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch(`/api/notifications/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setItems(data.items || []);
          setUnseenCount(data.unseenCount || 0);
        }
      } catch { /* silently fail */ }
    }
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // poll every 60s
    return () => clearInterval(interval);
  }, [slug]);

  async function markAllSeen() {
    const unseenIds = items.filter(i => !i.seen).map(i => i.id);
    if (unseenIds.length === 0) return;

    try {
      await fetch("/api/notifications/mark-seen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property: slug, notificationIds: unseenIds }),
      });
      setItems(prev => prev.map(i => ({ ...i, seen: true })));
      setUnseenCount(0);
    } catch { /* silently fail */ }
  }

  function handleToggle() {
    const next = !isOpen;
    setIsOpen(next);
    if (next && unseenCount > 0) {
      markAllSeen();
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="relative w-9 h-9 rounded-full bg-background-secondary hover:bg-border-light flex items-center justify-center transition-colors duration-200"
        aria-label="Notifications"
      >
        <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        {unseenCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
            {unseenCount > 9 ? "9+" : unseenCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-border-light overflow-hidden z-50"
          style={{ boxShadow: "0 20px 60px -12px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="px-4 py-3 border-b border-border-light">
            <p className="text-sm font-semibold text-foreground">Notifications</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-muted">No notifications yet</p>
                <p className="text-xs text-border mt-1">Updates will appear here</p>
              </div>
            ) : (
              items.slice(0, 10).map((item) => (
                <div
                  key={item.id}
                  className={`px-4 py-3 border-b border-border-light last:border-0 ${
                    !item.seen ? "bg-primary-soft/30" : ""
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-base mt-0.5">{typeIcon(item.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug">{item.title}</p>
                      <p className="text-[11px] text-muted mt-0.5">{timeAgo(item.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
