/**
 * Hand-drawn style SVG illustrations
 * Minimal, single-stroke line art — Apple aesthetic
 */

export function HouseIllustration({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 22L24 8L40 22V40C40 41.1 39.1 42 38 42H10C8.9 42 8 41.1 8 40V22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18 42V28H30V42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function ChartIllustration({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 38H42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 38V26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 38V18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M26 38V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M34 38V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 28C12 20 20 14 36 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 3"
        opacity="0.4"
      />
    </svg>
  );
}

export function PeopleIllustration({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M8 38C8 31.4 13.4 26 20 26H16C11.6 26 8 29.6 8 34V38Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10 38C10 32.5 14.5 28 20 28C25.5 28 30 32.5 30 38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M26 38C26 33.6 29.1 30 33 30C36.9 30 40 33.6 40 38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SearchIllustration({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M31 31L40 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 22H28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M22 16V28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeartIllustration({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 40L21.2 37.4C12 29.1 6 23.6 6 17C6 11.5 10.5 7 16 7C19.1 7 22 8.5 24 10.9C26 8.5 28.9 7 32 7C37.5 7 42 11.5 42 17C42 23.6 36 29.1 26.8 37.4L24 40Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function EmptyStateIllustration({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House outline */}
      <path
        d="M20 44L48 20L76 44V76C76 78.2 74.2 80 72 80H24C21.8 80 20 78.2 20 76V44Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M38 80V56H58V80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
      {/* Magnifying glass */}
      <circle cx="58" cy="36" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M68 46L78 56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Sparkle dots */}
      <circle cx="30" cy="30" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="74" cy="24" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="22" cy="60" r="1" fill="currentColor" opacity="0.15" />
    </svg>
  );
}
