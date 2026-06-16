import { createClient } from "@/utils/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { IntegrationsDiagram } from "@/components/integrations-diagram";
import { DashboardMock } from "@/components/dashboard-mock";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";

const capabilities = [
  ["◉", "Contacts & companies", "One clean record for every person and business you work with."],
  ["❑", "Visual pipeline", "Drag deals through stages on a board that updates live."],
  ["📊", "Reporting", "See revenue, win-rate, and momentum at a glance."],
  ["🛡", "Security", "Row-Level Security isolates every customer's data at the core."],
  ["⚡", "Speed", "An interface that feels instant from the first click."],
  ["❖", "Extensible", "A modular core, ready for the rest of the suite."],
];

export default async function FeaturesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const signedIn = !!user;

  return (
    <div className="relative">
      <SiteHeader signedIn={signedIn} />
      <main>
        <PageHero
          eyebrow="Features"
          title="Smarter business,"
          highlight="built for growth"
          subtitle="Discover the tools that make Vast a calmer, faster way to run your company."
        />

        {/* central node */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <IntegrationsDiagram />
          </Reveal>
        </section>

        {/* capability grid */}
        <section className="mx-auto max-w-6xl px-6 pb-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([g, t, d], i) => (
              <Reveal key={t} delay={(i % 3) * 80}>
                <SpotlightCard className="h-full p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ember-500/20 bg-gradient-to-br from-ember-500/25 to-ember-600/10 text-xl">
                    {g}
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-white/55">{d}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* showcase split */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <span className="eyebrow">Workspace</span>
              <h2 className="font-display mt-5 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Everything in one calm place
              </h2>
              <p className="mt-4 max-w-md text-white/55">
                No more jumping between tabs. Your pipeline, your customers, and your
                numbers — together, and always in sync.
              </p>
              <ul className="mt-6 space-y-3">
                {["Live pipeline totals", "Role-based access", "Audit-ready history"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ember-500/15 text-xs text-ember-300">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <DashboardMock />
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-5xl px-6 pb-28">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-[2rem] px-8 py-16 text-center">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-ember-500/30 blur-3xl" />
              <h2 className="font-display text-balance text-4xl font-bold tracking-tight md:text-5xl">
                See it in your own workspace
              </h2>
              <div className="mt-8 flex justify-center">
                <a href={signedIn ? "/dashboard" : "/login"} className="btn-primary">
                  {signedIn ? "Open dashboard" : "Start free"} →
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
