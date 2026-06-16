"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetchClient } from "@/utils/api-client";

export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await apiFetchClient("/api/onboarding/tenant", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    setLoading(false);
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.message ?? "Could not create your organization");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen flex-col px-6">
      <header className="flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-ember-500 to-ember-400 text-sm font-bold">
            V
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">Vast</span>
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center py-10">
      <div className="animate-scale-in glass w-full max-w-md rounded-[1.75rem] p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl">
          ✦
        </div>
        <h1 className="font-display mt-6 text-2xl font-semibold">
          Create your organization
        </h1>
        <p className="mt-1 text-sm text-white/50">
          This is your workspace in Vast — you&apos;ll be its owner.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="label">Organization name</label>
            <input
              required
              minLength={1}
              maxLength={120}
              placeholder="Acme Inc."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary mt-1 w-full disabled:opacity-50">
            {loading ? "Creating…" : "Create organization →"}
          </button>
        </form>
      </div>
      </div>

      <footer className="py-6 text-center text-xs text-white/35">
        © 2026 Vast · No limits to how you grow.
      </footer>
    </main>
  );
}
