// Animated "liquid" gradient blobs that drift behind everything. Pure CSS, fixed
// to the viewport, non-interactive. Sits at the very back of the stacking context.
export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#050509]" />
      <div className="absolute -left-[10%] top-[-15%] h-[55vmax] w-[55vmax] rounded-full bg-brand-violet/25 blur-[120px] animate-aurora-a pause-on-reduce" />
      <div className="absolute right-[-10%] top-[10%] h-[45vmax] w-[45vmax] rounded-full bg-brand-blue/20 blur-[120px] animate-aurora-b pause-on-reduce" />
      <div className="absolute bottom-[-20%] left-[20%] h-[50vmax] w-[50vmax] rounded-full bg-brand-pink/15 blur-[130px] animate-aurora-c pause-on-reduce" />
      {/* subtle grid + vignette for depth */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}
