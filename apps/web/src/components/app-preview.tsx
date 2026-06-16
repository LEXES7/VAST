"use client";

import { useRef } from "react";

const columns = [
  { name: "Lead", color: "from-white/10 to-white/0", deals: [["Acme Corp", "$12,000"], ["Globex", "$4,500"]] },
  { name: "Qualified", color: "from-ember-400/30 to-white/0", deals: [["Initech", "$22,000"]] },
  { name: "Proposal", color: "from-ember-500/30 to-white/0", deals: [["Umbrella", "$38,000"], ["Soylent", "$9,200"]] },
  { name: "Won", color: "from-ember-300/30 to-white/0", deals: [["Stark Inc", "$64,000"]] },
];

// A decorative, interactive preview of the Vast CRM. Tilts toward the cursor.
export function AppPreview() {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1400px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg)`;
  }
  function reset() {
    if (ref.current) ref.current.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div className="group relative mx-auto w-full max-w-5xl" style={{ perspective: "1400px" }}>
      {/* glow */}
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-ember-500/30 via-ember-400/20 to-ember-300/20 blur-3xl" />

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="glass overflow-hidden rounded-[1.4rem] transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: "perspective(1400px)" }}
      >
        {/* window bar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="font-display ml-3 text-sm font-semibold">Vast · Pipeline</span>
          <span className="ml-auto hidden gap-1 sm:flex">
            {["Contacts", "Companies", "Deals"].map((t, i) => (
              <span
                key={t}
                className={`rounded-full px-3 py-1 text-xs ${
                  i === 2 ? "bg-white text-black" : "text-white/45"
                }`}
              >
                {t}
              </span>
            ))}
          </span>
        </div>

        {/* stat row */}
        <div className="grid grid-cols-3 gap-3 px-4 pt-4">
          {[
            ["Pipeline", "$149.7k", "text-gradient"],
            ["Open deals", "6", "text-white"],
            ["Won this month", "$64k", "text-ember-300"],
          ].map(([label, value, cls]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-[10px] uppercase tracking-wider text-white/40">{label}</p>
              <p className={`font-display mt-1 text-xl font-bold ${cls}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* mini kanban */}
        <div className="grid grid-cols-4 gap-3 p-4">
          {columns.map((col) => (
            <div key={col.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-white/70">{col.name}</span>
                <span className="rounded-full bg-white/5 px-1.5 text-[10px] text-white/40">
                  {col.deals.length}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {col.deals.map(([name, amt]) => (
                  <div
                    key={name}
                    className={`rounded-lg border border-white/10 bg-gradient-to-br ${col.color} p-2`}
                  >
                    <p className="text-[11px] font-medium text-white/90">{name}</p>
                    <p className="text-[10px] text-white/50">{amt}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
