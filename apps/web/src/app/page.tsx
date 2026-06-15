import Link from "next/link";
import { VAST } from "@vast/shared";
import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "@/components/logout-button";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="rounded-full border border-white/15 px-4 py-1 text-sm text-white/60">
        Early build
      </span>
      <h1 className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-7xl font-bold tracking-tight text-transparent">
        {VAST.name}
      </h1>
      <p className="max-w-md text-lg text-white/60">{VAST.tagline}</p>

      {user ? (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-white/40">
            Signed in as <span className="text-white/70">{user.email}</span>
          </p>
          <Link
            href="/dashboard"
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
          >
            Go to dashboard
          </Link>
          <LogoutButton />
        </div>
      ) : (
        <Link
          href="/login"
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
        >
          Sign in
        </Link>
      )}
    </main>
  );
}
