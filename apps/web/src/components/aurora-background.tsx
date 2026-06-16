// Warm cinematic backdrop: a spotlight glow from the top, drifting ember blobs,
// and a faint circuit grid — all fixed behind the page. Pure CSS, non-interactive.
export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0705]" />

      {/* top spotlight — focused so the rest of the page stays deep black */}
      <div
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(45% 45% at 50% -5%, rgba(249,115,22,0.20), rgba(234,88,12,0.05) 38%, transparent 68%)",
        }}
      />

      {/* a couple of restrained ember blobs for depth */}
      <div className="absolute -left-[10%] top-[14%] h-[40vmax] w-[40vmax] rounded-full bg-ember-600/[0.07] blur-[150px] animate-aurora-a pause-on-reduce" />
      <div className="absolute right-[-10%] bottom-[6%] h-[38vmax] w-[38vmax] rounded-full bg-ember-500/[0.06] blur-[150px] animate-aurora-b pause-on-reduce" />

      {/* faint circuit grid */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)",
        }}
      />
    </div>
  );
}
