"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered reveal. Renders VISIBLE by default (SSR / no-JS / reduced-motion
 * always see content). On mount, if motion is welcome, it "arms" the hidden state
 * and reveals as the element scrolls into view — with a failsafe timer so content
 * can never get stuck hidden.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"shown" | "hidden">("shown");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return; // stay visible

    setState("hidden"); // arm the entrance
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    const failsafe = setTimeout(() => {
      setState("shown");
      io.disconnect();
    }, 1500);

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state}
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
