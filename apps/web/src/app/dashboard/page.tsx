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
    <section>
      <h1 className="mb-4 text-2xl font-semibold">Contacts</h1>
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
    </section>
  );
}
