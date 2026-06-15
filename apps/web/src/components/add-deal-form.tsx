"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetchClient } from "@/utils/api-client";
import { DEAL_STAGES } from "@/lib/deal-stages";

export function AddDealForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState<string>("lead");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await apiFetchClient("/api/deals", {
      method: "POST",
      body: JSON.stringify({
        title,
        stage,
        ...(amount ? { amount: Number(amount) } : {}),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const msg = Array.isArray(body.message) ? body.message.join(", ") : body.message;
      setError(msg ?? "Could not add deal");
      return;
    }
    setTitle("");
    setAmount("");
    setStage("lead");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="glass flex flex-wrap items-end gap-3 rounded-2xl p-4">
      <div className="flex flex-1 flex-col gap-1.5">
        <label className="label">Deal title</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} className="field" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="label">Amount</label>
        <input
          type="number"
          min={0}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="field w-32"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="label">Stage</label>
        <select value={stage} onChange={(e) => setStage(e.target.value)} className="field">
          {DEAL_STAGES.map((s) => (
            <option key={s.value} value={s.value} className="bg-[#0c0c14]">
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
        {loading ? "Adding…" : "Add deal"}
      </button>
      {error && <p className="w-full text-sm text-red-400">{error}</p>}
    </form>
  );
}
