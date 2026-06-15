"use client";

import { useState } from "react";
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
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-white/10 p-8"
      >
        <h1 className="text-2xl font-semibold">Create your organization</h1>
        <p className="text-sm text-white/50">
          This is your workspace in Vast. You&apos;ll be its owner.
        </p>
        <input
          required
          minLength={1}
          maxLength={120}
          placeholder="Acme Inc."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-white/15 bg-transparent px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-white px-3 py-2 text-sm font-medium text-black disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create organization"}
        </button>
      </form>
    </main>
  );
}
