import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { apiFetch } from "@/utils/api";
import { LogoutButton } from "@/components/logout-button";
import { DashboardNav } from "@/components/dashboard-nav";

type Principal = { userId: string; tenantId: string; role: string; email: string };

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const meRes = await apiFetch("/api/me");
  if (meRes.status === 403) redirect("/onboarding");
  if (meRes.status === 401) redirect("/login");
  const me: Principal | null = meRes.ok ? await meRes.json() : null;

  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 z-40 px-4 py-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display text-lg font-extrabold tracking-tight">
              Vast
            </Link>
            <DashboardNav />
          </div>
          <div className="flex items-center gap-3">
            {me && (
              <span className="hidden text-xs text-white/45 sm:block">
                {me.email} · <span className="text-ember-500/90">{me.role}</span>
              </span>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
