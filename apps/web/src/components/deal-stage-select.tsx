"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetchClient } from "@/utils/api-client";
import { DEAL_STAGES } from "@/lib/deal-stages";

// Moves a deal between pipeline stages by PATCHing { stage }.
export function DealStageSelect({ id, stage }: { id: string; stage: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    if (next === stage) return;
    setBusy(true);
    const res = await apiFetchClient(`/api/deals/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ stage: next }),
    });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  return (
    <select
      defaultValue={stage}
      onChange={onChange}
      disabled={busy}
      className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-white/60 transition hover:border-white/25 focus:border-brand-violet/60 focus:outline-none disabled:opacity-50"
    >
      {DEAL_STAGES.map((s) => (
        <option key={s.value} value={s.value} className="bg-[#0c0c14]">
          Move to: {s.label}
        </option>
      ))}
    </select>
  );
}
