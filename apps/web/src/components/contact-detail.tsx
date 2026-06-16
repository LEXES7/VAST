"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetchClient } from "@/utils/api-client";

type Contact = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
};

export function ContactDetail({ contact }: { contact: Contact }) {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: contact.firstName,
    lastName: contact.lastName ?? "",
    email: contact.email ?? "",
    phone: contact.phone ?? "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    setStatus("idle");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    const res = await apiFetchClient(`/api/contacts/${contact.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName || undefined,
        email: form.email || undefined,
        phone: form.phone || undefined,
      }),
    });
    if (!res.ok) {
      const b = await res.json().catch(() => ({}));
      setStatus("idle");
      setError(Array.isArray(b.message) ? b.message.join(", ") : b.message ?? "Could not save");
      return;
    }
    setStatus("saved");
    router.refresh();
  }

  async function remove() {
    if (!window.confirm("Delete this contact?")) return;
    const res = await apiFetchClient(`/api/contacts/${contact.id}`, { method: "DELETE" });
    if (res.ok) router.push("/dashboard/contacts");
  }

  const initials = (form.firstName || "?").charAt(0).toUpperCase();

  return (
    <section className="animate-fade-up mx-auto max-w-2xl">
      <Link href="/dashboard/contacts" className="text-sm text-white/45 transition hover:text-white">
        ← Contacts
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-ember-500/50 to-ember-600/40 text-2xl font-bold">
          {initials}
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            {form.firstName} {form.lastName}
          </h1>
          <p className="text-sm text-white/45">{form.email || "No email"}</p>
        </div>
      </div>

      <form onSubmit={save} className="glass mt-6 rounded-2xl p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="label">First name</label>
            <input className="field" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="label">Last name</label>
            <input className="field" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="label">Email</label>
            <input type="email" className="field" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="label">Phone</label>
            <input className="field" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <div className="mt-6 flex items-center justify-between">
          <button type="button" onClick={remove} className="text-sm text-red-400/80 transition hover:text-red-400">
            Delete contact
          </button>
          <button type="submit" disabled={status === "saving"} className="btn-primary disabled:opacity-50">
            {status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : "Save changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
