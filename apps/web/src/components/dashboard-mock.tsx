// A detailed, decorative preview of the Vast workspace — stat cards, a chart,
// and an activity feed. Static markup (no data); purely to show the product.
const bars = [42, 55, 38, 64, 48, 72, 60, 84, 56, 90, 70, 96, 62, 78];
const activity = [
  ["Acme Corp", "Proposal", "$38,000"],
  ["Globex", "Negotiation", "$22,500"],
  ["Stark Inc", "Won", "$64,000"],
  ["Initech", "Qualified", "$12,000"],
];

export function DashboardMock() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* warm glow behind */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-tr from-ember-600/25 via-ember-500/15 to-amber-400/10 blur-3xl" />

      <div className="glass overflow-hidden rounded-2xl">
        {/* top bar */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </span>
          <div className="ml-2 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-ember-500 to-ember-400 text-[10px] font-bold text-black">V</span>
            <span className="font-display text-sm font-semibold">Vast</span>
          </div>
          <div className="ml-auto hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/40 sm:flex">
            Search deals, contacts…
          </div>
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-ember-400 to-ember-600" />
        </div>

        <div className="grid grid-cols-[48px_1fr] sm:grid-cols-[56px_1fr]">
          {/* sidebar */}
          <div className="flex flex-col items-center gap-4 border-r border-white/10 py-5 text-white/40">
            {["◳", "◉", "❑", "✦", "⚙"].map((g, i) => (
              <span
                key={i}
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  i === 1 ? "bg-ember-500/20 text-ember-300" : "hover:bg-white/5"
                }`}
              >
                {g}
              </span>
            ))}
          </div>

          {/* main */}
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold">Welcome back, Sachintha</h3>
                <p className="text-xs text-white/40">Here&apos;s your pipeline this week</p>
              </div>
              <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/50">
                This week ▾
              </span>
            </div>

            {/* stat cards */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["Revenue", "$521K", "+12.8%"],
                ["Open deals", "18", "+5"],
                ["Win rate", "56%", "+4%"],
              ].map(([label, value, delta]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">{label}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="font-display text-xl font-bold">{value}</p>
                    <span className="rounded-full bg-ember-500/15 px-1.5 py-0.5 text-[10px] font-medium text-ember-300">
                      {delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              {/* chart */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="text-xs font-medium text-white/60">Daily deal value</p>
                <div className="mt-4 flex h-32 items-end gap-1.5">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-ember-600/40 to-ember-400"
                      style={{ height: `${h}%`, opacity: i === 11 ? 1 : 0.55 }}
                    />
                  ))}
                </div>
              </div>

              {/* activity */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="text-xs font-medium text-white/60">Recent deals</p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {activity.map(([name, stage, amt]) => (
                    <div key={name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-md bg-gradient-to-br from-ember-400/50 to-ember-600/40" />
                        <div className="leading-tight">
                          <p className="text-xs font-medium">{name}</p>
                          <p className="text-[10px] text-white/40">{stage}</p>
                        </div>
                      </div>
                      <span className="text-xs text-ember-300">{amt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
