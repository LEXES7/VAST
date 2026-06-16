import Link from "next/link";
import { CountUp } from "@/components/count-up";
import { DEAL_STAGES, formatAmount } from "@/lib/deal-stages";

export type Overview = {
  counts: { contacts: number; companies: number; deals: number };
  pipelineValue: number;
  wonValue: number;
  winRate: number;
  byStage: { stage: string; count: number; value: number }[];
  recentDeals: { id: string; title: string; stage: string; amount: number }[];
};

const stageLabel = (v: string) => DEAL_STAGES.find((s) => s.value === v)?.label ?? v;

export function OverviewView({ data }: { data: Overview }) {
  const maxStage = Math.max(1, ...data.byStage.map((s) => s.value));
  const stats = [
    { label: "Open pipeline", value: data.pipelineValue, money: true, glyph: "◈" },
    { label: "Won revenue", value: data.wonValue, money: true, glyph: "✓" },
    { label: "Win rate", value: data.winRate, suffix: "%", glyph: "❏" },
    { label: "Contacts", value: data.counts.contacts, glyph: "◉" },
  ];

  return (
    <section className="animate-fade-up">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Overview</h1>
          <p className="mt-1 text-sm text-white/45">Your business at a glance</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/contacts" className="btn-ghost !px-4 !py-2 !text-xs">+ Contact</Link>
          <Link href="/dashboard/deals" className="btn-primary !px-4 !py-2 !text-xs">+ Deal</Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass glass-hover rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-white/40">{s.label}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-ember-500/25 to-ember-600/10 text-sm">
                {s.glyph}
              </span>
            </div>
            <p className="font-display mt-3 text-3xl font-bold text-gradient">
              {s.money ? <CountUp value={s.value} prefix="$" /> : <CountUp value={s.value} suffix={s.suffix ?? ""} />}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="glass rounded-2xl p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Pipeline by stage</h2>
            <Link href="/dashboard/deals" className="text-xs text-ember-300 hover:text-ember-400">View board →</Link>
          </div>
          <div className="flex h-48 gap-3">
            {data.byStage.map((s, i) => (
              <div key={s.stage} className="flex flex-1 flex-col items-center">
                <span className="mb-1.5 text-xs text-white/50">{s.count}</span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="enter w-full rounded-t-md bg-gradient-to-t from-ember-600/50 to-ember-400"
                    style={{
                      height: `${Math.max(4, (s.value / maxStage) * 100)}%`,
                      animationDelay: `${i * 70}ms`,
                      opacity: s.stage === "won" ? 1 : 0.72,
                    }}
                  />
                </div>
                <span className="mt-2 text-center text-[10px] text-white/40">{stageLabel(s.stage)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="font-display mb-4 text-lg font-semibold">Recent deals</h2>
          {data.recentDeals.length === 0 ? (
            <p className="py-8 text-center text-sm text-white/40">No deals yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {data.recentDeals.map((d) => (
                <li key={d.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-ember-400/50 to-ember-600/40" />
                    <div className="leading-tight">
                      <p className="text-sm font-medium">{d.title}</p>
                      <p className="text-[11px] text-white/40">{stageLabel(d.stage)}</p>
                    </div>
                  </div>
                  <span className="text-sm text-ember-300">{formatAmount(d.amount)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
