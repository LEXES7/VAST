import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { apiFetch } from "@/utils/api";
import { LogoutButton } from "@/components/logout-button";
import { AddContactForm } from "@/components/add-contact-form";

type Principal = { userId: string; tenantId: string; role: string; email: string };
type Contact = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
};

export default async function DashboardPage() {
  // Must be logged in.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Resolve tenant. A 403 means "authenticated but no org yet" -> onboard.
  const meRes = await apiFetch("/api/me");
  if (meRes.status === 403) redirect("/onboarding");
  if (meRes.status === 401) redirect("/login");
  if (!meRes.ok) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white/60">
        Something went wrong loading your workspace.
      </main>
    );
  }
  const me: Principal = await meRes.json();

  const contactsRes = await apiFetch("/api/contacts");
  const contacts: Contact[] = contactsRes.ok ? await contactsRes.json() : [];

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Contacts</h1>
          <p className="text-sm text-white/40">
            {me.email} · role: {me.role}
          </p>
        </div>
        <LogoutButton />
      </header>

      <AddContactForm />

      <ul className="mt-8 divide-y divide-white/10">
        {contacts.length === 0 && (
          <li className="py-6 text-sm text-white/40">
            No contacts yet. Add your first one above.
          </li>
        )}
        {contacts.map((c) => (
          <li key={c.id} className="flex items-center justify-between py-3">
            <span className="font-medium">
              {c.firstName} {c.lastName ?? ""}
            </span>
            <span className="text-sm text-white/50">{c.email ?? c.phone ?? "—"}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
