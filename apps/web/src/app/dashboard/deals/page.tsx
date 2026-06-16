import { apiFetch } from "@/utils/api";
import { AddDealForm } from "@/components/add-deal-form";
import { PipelineBoard } from "@/components/pipeline-board";
import { formatAmount } from "@/lib/deal-stages";

type Deal = { id: string; title: string; amount: string; stage: string };

export default async function DealsPage() {
  const res = await apiFetch("/api/deals");
  const deals: Deal[] = res.ok ? await res.json() : [];
  const pipelineTotal = deals.reduce((s, d) => s + Number(d.amount), 0);

  return (
    <section className="animate-fade-up">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Pipeline</h1>
          <p className="mt-1 text-sm text-white/45">
            {deals.length} deals · drag a card to move it between stages
          </p>
        </div>
        <div className="text-right">
          <p className="label">Total pipeline</p>
          <p className="font-display text-2xl font-bold text-gradient">
            {formatAmount(pipelineTotal)}
          </p>
        </div>
      </div>

      <AddDealForm />

      <div className="mt-6">
        <PipelineBoard initial={deals} />
      </div>
    </section>
  );
}
