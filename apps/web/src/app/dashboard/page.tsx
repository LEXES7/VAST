import { apiFetch } from "@/utils/api";
import { AddContactForm } from "@/components/add-contact-form";

type Contact = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
};

export default async function ContactsPage() {
  const res = await apiFetch("/api/contacts");
  const contacts: Contact[] = res.ok ? await res.json() : [];

  return (
    <section className="animate-fade-up">
      <h1 className="font-display text-3xl font-bold tracking-tight">Contacts</h1>
      <p className="mb-6 mt-1 text-sm text-white/45">
        {contacts.length} {contacts.length === 1 ? "person" : "people"} in your workspace
      </p>

      <AddContactForm />

      <div className="glass mt-6 overflow-hidden rounded-2xl">
        {contacts.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-white/40">
            No contacts yet. Add your first one above.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {contacts.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between px-5 py-3.5 transition hover:bg-white/[0.03]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet/40 to-brand-blue/30 text-sm font-medium">
                    {c.firstName.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium">
                    {c.firstName} {c.lastName ?? ""}
                  </span>
                </div>
                <span className="text-sm text-white/45">{c.email ?? c.phone ?? "—"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
