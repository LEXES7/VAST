"use client";

import Link from "next/link";
import { useRef } from "react";
import { LineChart, BarChart } from "@/components/charts";

export function HeroShowcase({ signedIn }: { signedIn: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  // gentle parallax on the floating cards
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--px", `${x * 16}px`);
    el.style.setProperty("--py", `${y * 16}px`);
  }

  return (
    <section className="relative px-6 pt-36 text-center">
      <div className="enter mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/65 backdrop-blur-xl">
        <span className="h-1.5 w-1.5 rounded-full bg-ember-400" />
        V2 · CRM first
      </div>

      <h1 className="enter font-display mx-auto mt-7 max-w-4xl text-balance text-5xl font-extrabold leading-[1.03] tracking-tight [animation-delay:80ms] md:text-7xl">
        Explore the future of <span className="text-gradient">business</span> management
      </h1>
      <p className="enter mx-auto mt-6 max-w-xl text-balance text-lg text-white/55 [animation-delay:160ms]">
        Say goodbye to scattered tools. Vast brings your contacts, companies, and
        deals into one fast, beautiful workspace.
      </p>

      {/* email capture */}
      <form
        action="/login"
        className="enter mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] p-1.5 backdrop-blur-xl [animation-delay:240ms]"
      >
        <input
          type="email"
          placeholder="Enter your work email"
          className="flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/35 focus:outline-none"
        />
        <button type="submit" className="btn-primary !px-5 !py-2 !text-xs">
          Get started
        </button>
      </form>

      {/* floating dashboard cards */}
      <div
        ref={ref}
        onMouseMove={onMove}
        className="relative mx-auto mt-16 hidden h-[460px] max-w-5xl lg:block"
      >
        {/* Pipeline / bar card */}
        <div
          className="glass absolute left-0 top-6 w-64 -rotate-3 rounded-2xl p-4 animate-float pause-on-reduce"
          style={{ transform: "translate(var(--px,0), var(--py,0)) rotate(-3deg)" }}
        >
          <p className="text-xs text-white/45">Your pipeline</p>
          <p className="font-display mt-1 text-2xl font-bold">$149.7K</p>
          <BarChart className="mt-3 h-16" />
          <div className="mt-2 flex justify-between text-[10px] text-white/30">
            <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
          </div>
        </div>

        {/* Revenue / line card (centerpiece) */}
        <div
          className="glass absolute left-1/2 top-24 w-[26rem] -translate-x-1/2 rounded-2xl p-5"
          style={{ transform: "translate(calc(-50% + var(--px,0)), var(--py,0))" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/45">Revenue</p>
              <p className="font-display text-3xl font-bold">$521K</p>
              <p className="text-xs text-ember-300">Your business is growing +12.8%</p>
            </div>
            <span className="rounded-lg bg-ember-500/15 px-2 py-1 text-[10px] text-ember-300">This year</span>
          </div>
          <LineChart className="mt-4 h-24 w-full" />
          <div className="mt-3 flex gap-4 text-[11px] text-white/45">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-ember-500" /> Won +40%</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-ember-300" /> Open +47%</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/30" /> Lost +13%</span>
          </div>
        </div>

        {/* Activity card */}
        <div
          className="glass absolute right-0 top-0 w-60 rotate-2 rounded-2xl p-4 animate-float pause-on-reduce [animation-delay:1.5s]"
          style={{ transform: "translate(var(--px,0), var(--py,0)) rotate(2deg)" }}
        >
          <p className="text-xs text-white/45">Recent deals</p>
          {[["Acme Corp", "+$38,000", "text-ember-300"], ["Globex", "+$22,500", "text-ember-300"]].map(([n, a, c]) => (
            <div key={n} className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-ember-400/50 to-ember-600/40" />
                <span className="text-xs">{n}</span>
              </div>
              <span className={`text-xs ${c}`}>{a}</span>
            </div>
          ))}
        </div>

        {/* Won success pill */}
        <div
          className="glass absolute bottom-2 right-10 flex items-center gap-3 rounded-2xl p-3 animate-float pause-on-reduce [animation-delay:0.8s]"
          style={{ transform: "translate(var(--px,0), var(--py,0))" }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember-500 text-black">✓</span>
          <div className="text-left">
            <p className="text-xs font-medium">Deal won</p>
            <p className="text-[10px] text-white/45">Stark Inc · $64,000</p>
          </div>
        </div>
      </div>

      {/* mobile fallback CTA */}
      <div className="mt-10 lg:hidden">
        <Link href={signedIn ? "/dashboard" : "/login"} className="btn-primary">
          {signedIn ? "Open dashboard" : "Start free"} →
        </Link>
      </div>
    </section>
  );
}
