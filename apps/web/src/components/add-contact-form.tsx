"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetchClient } from "@/utils/api-client";

export function AddContactForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await apiFetchClient("/api/contacts", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        ...(lastName ? { lastName } : {}),
        ...(email ? { email } : {}),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const msg = Array.isArray(body.message) ? body.message.join(", ") : body.message;
      setError(msg ?? "Could not add contact");
      return;
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="glass flex flex-wrap items-end gap-3 rounded-2xl p-4">
      <div className="flex flex-1 flex-col gap-1.5">
        <label className="label">First name</label>
        <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="field" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <label className="label">Last name</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="field" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <label className="label">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
        {loading ? "Adding…" : "Add contact"}
      </button>
      {error && <p className="w-full text-sm text-red-400">{error}</p>}
    </form>
  );
}
