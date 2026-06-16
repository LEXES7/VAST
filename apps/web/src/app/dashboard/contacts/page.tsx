import { apiFetch } from "@/utils/api";
import { AddContactForm } from "@/components/add-contact-form";
import { ContactsList } from "@/components/contacts-list";

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
      <ContactsList initial={contacts} />
    </section>
  );
}
