import { VAST } from "@vast/shared";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="rounded-full border border-white/15 px-4 py-1 text-sm text-white/60">
        Early build
      </span>
      <h1 className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-7xl font-bold tracking-tight text-transparent">
        {VAST.name}
      </h1>
      <p className="max-w-md text-lg text-white/60">{VAST.tagline}</p>
      <p className="text-sm text-white/40">
        A modern, unified business suite. Flagship: CRM / Sales.
      </p>
    </main>
  );
}
