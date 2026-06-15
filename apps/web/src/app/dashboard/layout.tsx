import { redirect } from "next/navigation";
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
  // Single gate for every dashboard page.
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
    <div className="mx-auto max-w-4xl px-6 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <DashboardNav />
        <div className="flex items-center gap-3">
          {me && (
            <span className="text-sm text-white/40">
              {me.email} · {me.role}
            </span>
          )}
          <LogoutButton />
        </div>
      </header>
      {children}
    </div>
  );
}
