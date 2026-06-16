"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetchClient } from "@/utils/api-client";
import { DEAL_STAGES, formatAmount } from "@/lib/deal-stages";
import { DeleteButton } from "@/components/delete-button";

type Deal = { id: string; title: string; amount: string | number; stage: string };

export function PipelineBoard({ initial }: { initial: Deal[] }) {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>(initial);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<string | null>(null);

  const byStage = (st: string) => deals.filter((d) => d.stage === st);
  const stageTotal = (st: string) => byStage(st).reduce((s, d) => s + Number(d.amount), 0);

  async function moveTo(stage: string) {
    const id = dragId;
    setDragId(null);
    setOverStage(null);
    if (!id) return;
    const current = deals.find((d) => d.id === id);
    if (!current || current.stage === stage) return;

    // optimistic
    setDeals((ds) => ds.map((d) => (d.id === id ? { ...d, stage } : d)));
    const res = await apiFetchClient(`/api/deals/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ stage }),
    });
    if (!res.ok) setDeals(initial); // revert on failure
    else router.refresh();
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {DEAL_STAGES.map((s) => {
        const items = byStage(s.value);
        const isOver = overStage === s.value;
        return (
          <div
            key={s.value}
            onDragOver={(e) => {
              e.preventDefault();
              if (overStage !== s.value) setOverStage(s.value);
            }}
            onDragLeave={() => setOverStage((p) => (p === s.value ? null : p))}
            onDrop={() => moveTo(s.value)}
            className={`glass rounded-2xl p-3 transition-all duration-200 ${
              isOver ? "scale-[1.02] ring-2 ring-ember-500/60" : ""
            }`}
          >
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-sm font-semibold">{s.label}</h2>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/40">
                {items.length}
              </span>
            </div>
            <p className="mb-3 text-xs text-white/40">{formatAmount(stageTotal(s.value))}</p>

            <div className="flex min-h-[60px] flex-col gap-2">
              {items.map((d) => (
                <div
                  key={d.id}
                  draggable
                  onDragStart={() => setDragId(d.id)}
                  onDragEnd={() => {
                    setDragId(null);
                    setOverStage(null);
                  }}
                  className={`group cursor-grab rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-200 hover:border-ember-500/40 hover:bg-white/[0.06] active:cursor-grabbing ${
                    dragId === d.id ? "scale-95 opacity-40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-sm font-medium leading-snug">{d.title}</p>
                    <span className="opacity-0 transition group-hover:opacity-100">
                      <DeleteButton path={`/api/deals/${d.id}`} />
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-ember-300/80">{formatAmount(d.amount)}</p>
                </div>
              ))}
              {items.length === 0 && (
                <p className={`rounded-xl border border-dashed py-5 text-center text-xs transition ${
                  isOver ? "border-ember-500/50 text-ember-300" : "border-white/10 text-white/25"
                }`}>
                  {isOver ? "Drop here" : "Empty"}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
