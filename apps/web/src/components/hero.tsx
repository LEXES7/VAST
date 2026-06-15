"use client";

import Link from "next/link";
import { useRef } from "react";

// Hero with a light that follows the cursor across the VAST wordmark.
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
      className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 text-center"
      style={{
        background:
          "radial-gradient(600px circle at var(--mx, 50%) var(--my, 40%), rgba(139,92,246,0.12), transparent 65%)",
      }}
    >
      <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60 backdrop-blur-xl">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-cyan" />
        </span>
        Now in early access
      </div>

      {/* Giant wordmark */}
      <h1
        className="font-display mt-8 select-none text-[26vw] font-extrabold leading-[0.82] tracking-tight md:text-[20vw] lg:text-[16rem]"
        style={{ letterSpacing: "-0.04em" }}
      >
        <span className="text-gradient drop-shadow-[0_0_60px_rgba(139,92,246,0.35)]">
          VAST
        </span>
      </h1>

      <p className="animate-fade-up mt-2 max-w-xl text-balance text-lg text-white/55 [animation-delay:120ms]">
        A modern, unified business suite. Clean UX, one connected data model, and
        security built into the foundation.
      </p>

      <div className="animate-fade-up mt-9 flex items-center gap-3 [animation-delay:240ms]">
        {signedIn ? (
          <Link href="/dashboard" className="btn-primary">
            Open dashboard →
          </Link>
        ) : (
          <>
            <Link href="/login" className="btn-primary">
              Get started →
            </Link>
            <a href="#features" className="btn-ghost">
              Explore
            </a>
          </>
        )}
      </div>

      <span className="font-display mt-16 text-sm tracking-[0.3em] text-white/30">
        NO LIMITS TO HOW YOU GROW
      </span>
    </section>
  );
}
