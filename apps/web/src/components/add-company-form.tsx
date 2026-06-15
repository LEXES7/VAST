"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetchClient } from "@/utils/api-client";

export function AddCompanyForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await apiFetchClient("/api/companies", {
      method: "POST",
      body: JSON.stringify({ name, ...(domain ? { domain } : {}) }),
    });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const msg = Array.isArray(body.message) ? body.message.join(", ") : body.message;
      setError(msg ?? "Could not add company");
      return;
    }
    setName("");
    setDomain("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="glass flex flex-wrap items-end gap-3 rounded-2xl p-4">
      <div className="flex flex-1 flex-col gap-1.5">
        <label className="label">Company name</label>
        <input required value={name} onChange={(e) => setName(e.target.value)} className="field" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <label className="label">Domain</label>
        <input placeholder="acme.com" value={domain} onChange={(e) => setDomain(e.target.value)} className="field" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
        {loading ? "Adding…" : "Add company"}
      </button>
      {error && <p className="w-full text-sm text-red-400">{error}</p>}
    </form>
  );
}
