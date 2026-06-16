"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
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
        <Link href="/" className="ml-auto text-sm text-white/50 transition hover:text-white">
          ← Back to home
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center py-10">
      <div className="animate-scale-in glass w-full max-w-md rounded-[1.75rem] p-8">
        <h1 className="font-display text-2xl font-semibold">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-1 text-sm text-white/50">
          {mode === "signin"
            ? "Sign in to your workspace."
            : "Start building with Vast in seconds."}
        </p>

        {/* segmented toggle */}
        <div className="mt-6 grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError(null);
              }}
              className={`rounded-full py-1.5 text-sm transition ${
                mode === m ? "bg-white text-black" : "text-white/55 hover:text-white"
              }`}
            >
              {m === "signin" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="label">Email</label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="label">Password</label>
            <input
              type="password"
              required
              minLength={8}
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary mt-1 w-full disabled:opacity-50">
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
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
