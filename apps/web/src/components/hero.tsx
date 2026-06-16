"use client";

import Link from "next/link";
import { useRef } from "react";

// Hero with a soft light that follows the cursor.
export function Hero({ signedIn }: { signedIn: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex flex-col items-center px-6 pt-36 text-center"
      style={{
        background:
          "radial-gradient(700px circle at var(--mx, 50%) var(--my, 30%), rgba(249,115,22,0.12), transparent 60%)",
      }}
    >
      <div className="enter inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/65 backdrop-blur-xl">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-300 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-300" />
        </span>
        Now in early access · CRM first
      </div>

      <h1 className="enter font-display mt-7 max-w-4xl text-balance text-5xl font-extrabold leading-[1.02] tracking-tight [animation-delay:80ms] md:text-7xl">
        The business suite that
        <br className="hidden sm:block" /> feels like the{" "}
        <span className="text-gradient">future</span>.
      </h1>

      <p className="enter mt-6 max-w-xl text-balance text-lg text-white/55 [animation-delay:160ms]">
        Vast unifies your customers, companies, and deals into one fast, beautiful
        workspace — with security built into the foundation.
      </p>

      <div className="enter mt-9 flex flex-wrap items-center justify-center gap-3 [animation-delay:240ms]">
        <Link href={signedIn ? "/dashboard" : "/login"} className="btn-primary">
          {signedIn ? "Open dashboard" : "Start free"} →
        </Link>
        <a href="#features" className="btn-ghost">See what's inside</a>
      </div>
    </section>
  );
}
