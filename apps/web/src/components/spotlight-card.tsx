"use client";

import { useRef } from "react";

/**
 * A glass card with a soft light that follows the cursor inside it.
 * Tracks the pointer and feeds its position to the `.spotlight` CSS gradient.
 */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`glass glass-hover spotlight rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
}
