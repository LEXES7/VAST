import { createClient } from "@/utils/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroShowcase } from "@/components/hero-showcase";
import { DashboardMock } from "@/components/dashboard-mock";
import { IntegrationsDiagram } from "@/components/integrations-diagram";
import { PricingTiers } from "@/components/pricing-tiers";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";

const marqueeItems = [
  "Unified data model",
  "Row-Level Security",
  "Role-based access",
  "Real-time pipeline",
  "Modern UX",
  "Built to scale",
];

const features = [
  { glyph: "◉", title: "One connected data model", body: "Contacts, companies, and deals live together — no silos, no duplicate truth." },
  { glyph: "⚡", title: "Fast everywhere", body: "An interface that feels instant, because slow software quietly costs you customers." },
  { glyph: "🛡", title: "Secure to the core", body: "Each customer's data is isolated at the database, not just in app code." },
  { glyph: "❑", title: "A pipeline you can feel", body: "Move deals across stages on a board that reacts the moment you touch it." },
  { glyph: "❖", title: "One suite, growing", body: "Start with CRM. The rest of the suite arrives on the same foundation." },
  { glyph: "✦", title: "Built to scale", body: "A modular core that stays simple today and grows gracefully tomorrow." },
];

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const signedIn = !!user;

  return (
    <div className="relative">
      <SiteHeader signedIn={signedIn} />

      <main>
        <HeroShowcase signedIn={signedIn} />

        {/* trust marquee */}
        <div className="relative mt-20 overflow-hidden border-y border-white/[0.06] py-5">
          <div className="flex w-max animate-marquee gap-10 pr-10 pause-on-reduce">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-white/35">
                <span className="text-ember-500">✦</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* features */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
          <Reveal className="text-center">
            <span className="eyebrow">Features</span>
            <h2 className="font-display mx-auto mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Everything connected. <span className="text-gradient">Nothing</span> in your way.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 80}>
                <SpotlightCard className="h-full p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ember-500/20 bg-gradient-to-br from-ember-500/25 to-ember-600/10 text-xl">
                    {f.glyph}
                  </div>
                  <h3 className="font-display mt-5 text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{f.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* integrations diagram */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <Reveal className="text-center">
            <span className="eyebrow">The core</span>
            <h2 className="font-display mx-auto mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tight md:text-5xl">
              One platform. <span className="text-gradient">Every</span> moving part.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/55">
              Everything in Vast feeds the same connected core — so your whole business
              stays in sync, automatically.
            </p>
          </Reveal>
          <div className="mt-16">
            <IntegrationsDiagram />
          </div>
        </section>

        {/* pipeline */}
        <section id="pipeline" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <span className="eyebrow">Pipeline</span>
              <h2 className="font-display mt-5 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Move deals like you mean it
              </h2>
              <p className="mt-4 max-w-md text-white/55">
                A living board that reacts the moment you touch it. Move a deal forward,
                watch the numbers update, and always know where revenue stands.
              </p>
              <ul className="mt-6 space-y-3">
                {["Six-stage pipeline, fully tenant-scoped", "Live totals per stage", "Role-based controls on every action"].map((t) => (
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

        {/* pricing */}
        <section id="pricing" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
          <Reveal className="text-center">
            <span className="eyebrow">Pricing</span>
            <h2 className="font-display mx-auto mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Simple pricing that <span className="text-gradient">grows</span> with you
            </h2>
          </Reveal>
          <div className="mt-14">
            <PricingTiers signedIn={signedIn} />
          </div>
        </section>

        {/* security */}
        <section id="security" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-12">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-[2rem] p-10 md:p-14">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-ember-500/20 blur-3xl" />
              <span className="eyebrow">Secure by design</span>
              <h2 className="font-display mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Your customers&apos; data, isolated at the core
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {[
                  ["Database-level isolation", "Every tenant's data is separated by Row-Level Security — not just app code."],
                  ["Deny-by-default", "Every action requires a verified session and the right role."],
                  ["Continuously scanned", "Dependency, secret, and code scanning run on every change."],
                ].map(([t, d]) => (
                  <div key={t}>
                    <h3 className="font-display text-lg font-semibold">{t}</h3>
                    <p className="mt-1.5 text-sm text-white/55">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-5xl px-6 py-28">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-[2rem] px-8 py-16 text-center">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-ember-500/30 blur-3xl" />
              <h2 className="font-display text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Ready to grow without limits?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-white/55">
                Create your workspace in seconds and make it yours.
              </p>
              <div className="mt-8 flex justify-center">
                <a href={signedIn ? "/dashboard" : "/login"} className="btn-primary">
                  {signedIn ? "Open dashboard" : "Get started free"} →
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
