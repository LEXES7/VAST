import { Injectable } from "@nestjs/common";
import { withTenant } from "@vast/db";

const STAGES = ["lead", "qualified", "proposal", "negotiation", "won", "lost"] as const;

// Aggregated numbers for the dashboard overview, scoped to the tenant via RLS.
@Injectable()
export class OverviewService {
  get(tenantId: string) {
    return withTenant(tenantId, async (tx) => {
      const [contacts, companies, deals, grouped, recentDeals] = await Promise.all([
        tx.contact.count(),
        tx.company.count(),
        tx.deal.count(),
        tx.deal.groupBy({ by: ["stage"], _count: { _all: true }, _sum: { amount: true } }),
        tx.deal.findMany({ take: 6, orderBy: { createdAt: "desc" } }),
      ]);

      const byStage = STAGES.map((stage) => {
        const row = grouped.find((g) => g.stage === stage);
        return {
          stage,
          count: row?._count._all ?? 0,
          value: Number(row?._sum.amount ?? 0),
        };
      });

      const openValue = byStage
        .filter((s) => s.stage !== "won" && s.stage !== "lost")
        .reduce((sum, s) => sum + s.value, 0);
      const wonValue = byStage.find((s) => s.stage === "won")?.value ?? 0;
      const wonCount = byStage.find((s) => s.stage === "won")?.count ?? 0;
      const lostCount = byStage.find((s) => s.stage === "lost")?.count ?? 0;
      const closed = wonCount + lostCount;
      const winRate = closed > 0 ? Math.round((wonCount / closed) * 100) : 0;

      return {
        counts: { contacts, companies, deals },
        pipelineValue: openValue,
        wonValue,
        winRate,
        byStage,
        recentDeals: recentDeals.map((d) => ({
          id: d.id,
          title: d.title,
          stage: d.stage,
          amount: Number(d.amount),
        })),
      };
    });
  }
}
