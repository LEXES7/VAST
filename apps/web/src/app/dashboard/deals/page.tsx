import { apiFetch } from "@/utils/api";
import { AddDealForm } from "@/components/add-deal-form";
import { DealStageSelect } from "@/components/deal-stage-select";
import { DEAL_STAGES, formatAmount } from "@/lib/deal-stages";

type Deal = { id: string; title: string; amount: string; stage: string };

export default async function DealsPage() {
  const res = await apiFetch("/api/deals");
  const deals: Deal[] = res.ok ? await res.json() : [];

  const byStage = (stage: string) => deals.filter((d) => d.stage === stage);
  const stageTotal = (stage: string) =>
    byStage(stage).reduce((sum, d) => sum + Number(d.amount), 0);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold">Pipeline</h1>
      <AddDealForm />

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {DEAL_STAGES.map((s) => {
          const items = byStage(s.value);
          return (
            <div key={s.value} className="rounded-xl border border-white/10 p-3">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="text-sm font-medium">{s.label}</h2>
                <span className="text-xs text-white/40">{items.length}</span>
              </div>
              <p className="mb-3 text-xs text-white/40">
                {formatAmount(stageTotal(s.value))}
              </p>
              <div className="flex flex-col gap-2">
                {items.map((d) => (
                  <div key={d.id} className="rounded-lg border border-white/10 p-2">
                    <p className="text-sm font-medium">{d.title}</p>
                    <p className="text-xs text-white/50">{formatAmount(d.amount)}</p>
                    <DealStageSelect id={d.id} stage={d.stage} />
                  </div>
                ))}
                {items.length === 0 && (
                  <p className="text-xs text-white/25">—</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
