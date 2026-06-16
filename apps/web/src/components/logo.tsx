// Vast logo — an abstract "expanding growth" mark: stacked chevrons opening
// upward and outward (no limits to how you grow), in the warm ember gradient.

export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="vast-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="55%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#vast-mark)" />
      <path
        d="M8 19.5 L16 10.5 L24 19.5"
        fill="none"
        stroke="#1a0e06"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 23.5 L16 17.5 L21 23.5"
        fill="none"
        stroke="#1a0e06"
        strokeOpacity="0.45"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="font-display text-lg font-extrabold tracking-tight">Vast</span>
    </span>
  );
}
