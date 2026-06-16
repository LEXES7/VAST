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
  const [sent, setSent] = useState(false);

  async function oauth(provider: "github" | "google") {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
    });
    if (error) setError(error.message);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return setError(error.message);
      router.push("/dashboard");
      router.refresh();
      return;
    }

    // sign up
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/confirm?next=/dashboard` },
    });
    setLoading(false);
    if (error) return setError(error.message);

    // No session means email confirmation is required.
    if (!data.session) {
      setSent(true);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen flex-col px-6">
      <header className="flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-ember-400 to-ember-600 text-sm font-bold text-black">
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
          {sent ? (
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-ember-500/15 text-2xl">
                ✉️
              </div>
              <h1 className="font-display mt-5 text-2xl font-semibold">Check your inbox</h1>
              <p className="mt-2 text-sm text-white/55">
                We sent a confirmation link to <span className="text-white">{email}</span>.
                Click it to activate your account, then sign in.
              </p>
              <button onClick={() => { setSent(false); setMode("signin"); }} className="btn-ghost mt-6 w-full">
                Back to sign in
              </button>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-semibold">
                {mode === "signin" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-1 text-sm text-white/50">
                {mode === "signin" ? "Sign in to your workspace." : "Start building with Vast in seconds."}
              </p>

              {/* social login — no email needed */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button onClick={() => oauth("github")} className="btn-ghost">GitHub</button>
                <button onClick={() => oauth("google")} className="btn-ghost">Google</button>
              </div>

              <div className="my-5 flex items-center gap-3 text-xs text-white/30">
                <span className="h-px flex-1 bg-white/10" /> or with email <span className="h-px flex-1 bg-white/10" />
              </div>

              {/* segmented toggle */}
              <div className="grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
                {(["signin", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setMode(m); setError(null); }}
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
                  <input type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="label">Password</label>
                  <input type="password" required minLength={8} placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="field" />
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary mt-1 w-full disabled:opacity-50">
                  {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <footer className="py-6 text-center text-xs text-white/35">
        © 2026 Vast · No limits to how you grow.
      </footer>
    </main>
  );
}
