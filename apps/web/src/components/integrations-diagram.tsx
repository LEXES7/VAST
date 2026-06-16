// A glowing "everything connects to Vast" diagram: a central node with
// connector lines radiating to surrounding capability nodes.
const left = ["Contacts", "Companies", "Activities"];
const right = ["Deals", "Pipeline", "Reports"];

function Node({ label }: { label: string }) {
  return (
    <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/70">
      <span className="h-2 w-2 rounded-full bg-ember-400 shadow-[0_0_10px_2px_rgba(251,146,60,0.6)]" />
      {label}
    </div>
  );
}

export function IntegrationsDiagram() {
  return (
    <div className="relative mx-auto grid max-w-3xl grid-cols-3 items-center gap-6">
      {/* connector backdrop */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(249,115,22,0.12), transparent 60%)",
        }}
      />

      <div className="flex flex-col gap-4">
        {left.map((l) => (
          <Node key={l} label={l} />
        ))}
      </div>

      {/* center */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-6 animate-glow-pulse rounded-full bg-ember-500/40 blur-2xl" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-ember-400/40 bg-gradient-to-br from-ember-500 to-ember-600 shadow-[0_0_50px_-6px_rgba(249,115,22,0.8)]">
            <span className="font-display text-4xl font-extrabold text-black">V</span>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-white/40">One core. Everything connected.</p>
      </div>

      <div className="flex flex-col gap-4">
        {right.map((r) => (
          <Node key={r} label={r} />
        ))}
      </div>
    </div>
  );
}
