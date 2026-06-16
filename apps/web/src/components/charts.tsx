// Tiny decorative charts for the product mockups. SVG, no data.

export function LineChart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 90" preserveAspectRatio="none" className={className}>
      <defs>
        <linearGradient id="lc-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="lc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,62 C40,40 60,70 96,52 C132,34 150,18 192,34 C232,49 250,30 290,24 L320,20"
        fill="none"
        stroke="url(#lc-stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M0,62 C40,40 60,70 96,52 C132,34 150,18 192,34 C232,49 250,30 290,24 L320,20 L320,90 L0,90 Z"
        fill="url(#lc-fill)"
      />
      {/* faint secondary line */}
      <path
        d="M0,74 C50,66 70,80 110,70 C150,60 180,66 220,58 C260,50 290,56 320,48"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function BarChart({ className = "" }: { className?: string }) {
  const bars = [38, 52, 30, 64, 46, 70, 42];
  return (
    <div className={`flex items-end gap-1.5 ${className}`}>
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-ember-600/50 to-ember-400"
          style={{ height: `${h}%`, opacity: i === 5 ? 1 : 0.5 }}
        />
      ))}
    </div>
  );
}
