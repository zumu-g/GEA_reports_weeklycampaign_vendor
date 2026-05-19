interface TrendBadgeProps {
  current: number;
  previous: number | undefined;
}

/**
 * Inline week-over-week percentage change indicator.
 * Renders nothing if previous is undefined, zero, or the change is less than 1%.
 * Caps display at ±999% to avoid absurd numbers when coming off a zero baseline.
 */
export default function TrendBadge({ current, previous }: TrendBadgeProps) {
  if (previous === undefined || previous === null || previous === 0) return null;

  const pct = ((current - previous) / previous) * 100;
  const absPct = Math.abs(pct);

  if (absPct < 1) return null;

  const capped = Math.min(Math.round(absPct), 999);
  const isUp = pct > 0;

  return (
    <span
      className={`font-mono text-xs tabular-nums ml-2 ${
        isUp ? 'text-emerald-600' : 'text-red-500'
      }`}
    >
      {isUp ? `↑ +${capped}%` : `↓ −${capped}%`}
    </span>
  );
}
