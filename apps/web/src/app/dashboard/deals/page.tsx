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
  const pipelineTotal = deals.reduce((s, d) => s + Number(d.amount), 0);

  return (
    <section className="animate-fade-up">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Pipeline</h1>
          <p className="mt-1 text-sm text-white/45">{deals.length} deals in play</p>
        </div>
        <div className="text-right">
          <p className="label">Total pipeline</p>
          <p className="font-display text-2xl font-bold text-gradient">
            {formatAmount(pipelineTotal)}
          </p>
        </div>
      </div>

      <AddDealForm />

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {DEAL_STAGES.map((s) => {
          const items = byStage(s.value);
          return (
            <div key={s.value} className="glass rounded-2xl p-3">
              <div className="mb-1 flex items-baseline justify-between">
                <h2 className="text-sm font-semibold">{s.label}</h2>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/40">
                  {items.length}
                </span>
              </div>
              <p className="mb-3 text-xs text-white/40">{formatAmount(stageTotal(s.value))}</p>
              <div className="flex flex-col gap-2">
                {items.map((d) => (
                  <div
                    key={d.id}
                    className="glass-hover rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <p className="text-sm font-medium leading-snug">{d.title}</p>
                    <p className="mt-0.5 text-xs text-ember-300/80">{formatAmount(d.amount)}</p>
                    <DealStageSelect id={d.id} stage={d.stage} />
                  </div>
                ))}
                {items.length === 0 && (
                  <p className="rounded-xl border border-dashed border-white/10 py-4 text-center text-xs text-white/25">
                    Empty
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
