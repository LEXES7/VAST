import { createClient } from "@/utils/supabase/server";
import { MarketingNav } from "@/components/marketing-nav";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";

const features = [
  {
    title: "Unified by design",
    body: "Contacts, companies, and deals share one clean data model — no silos, no duplicate truth.",
    glyph: "◉",
  },
  {
    title: "A pipeline you can feel",
    body: "Move deals through stages on a fluid board that reacts the moment you touch it.",
    glyph: "❑",
  },
  {
    title: "Secure to the core",
    body: "Every customer's data is isolated at the database layer. Security isn't a setting — it's the foundation.",
    glyph: "🛡",
  },
  {
    title: "Built to scale",
    body: "A modular architecture that stays simple today and grows gracefully tomorrow.",
    glyph: "✦",
  },
  {
    title: "Fast, everywhere",
    body: "A modern interface that feels instant — because slow software quietly costs you customers.",
    glyph: "⚡",
  },
  {
    title: "One suite, growing",
    body: "Start with CRM. The rest of the suite arrives on the same connected foundation.",
    glyph: "❖",
  },
];

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const signedIn = !!user;

  return (
    <main className="relative">
      <MarketingNav signedIn={signedIn} />

      <Hero signedIn={signedIn} />

      {/* ── Features ─────────────────────────────────────── */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
        <Reveal>
          <p className="font-display text-center text-sm uppercase tracking-[0.3em] text-brand-violet/80">
            Why Vast
          </p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-balance text-center text-4xl font-bold tracking-tight md:text-5xl">
            Software that feels as good as it works
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <SpotlightCard className="h-full p-7">
                <div className="reveal-blur">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl">
                    {f.glyph}
                  </div>
                  <h3 className="font-display mt-5 text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{f.body}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pb-32">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] px-8 py-16 text-center">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-violet/30 blur-3xl" />
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

      <footer className="border-t border-white/5 py-10 text-center text-sm text-white/35">
        <span className="font-display text-white/60">Vast</span> — no limits to how you grow.
      </footer>
    </main>
  );
}
