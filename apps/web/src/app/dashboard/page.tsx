import { apiFetch } from "@/utils/api";
import { OverviewView, type Overview } from "@/components/overview-view";
import { DEAL_STAGES } from "@/lib/deal-stages";

const EMPTY: Overview = {
  counts: { contacts: 0, companies: 0, deals: 0 },
  pipelineValue: 0,
  wonValue: 0,
  winRate: 0,
  byStage: DEAL_STAGES.map((s) => ({ stage: s.value, count: 0, value: 0 })),
  recentDeals: [],
};

export default async function OverviewPage() {
  const res = await apiFetch("/api/overview");
  const data: Overview = res.ok ? await res.json() : EMPTY;
  return <OverviewView data={data} />;
}
