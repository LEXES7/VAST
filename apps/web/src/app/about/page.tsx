import { createClient } from "@/utils/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";

const values = [
  ["Clarity over clutter", "Software should feel calm. We cut noise so you can focus on the work that matters."],
  ["Secure by default", "Trust is earned at the foundation — isolation and least-privilege from line one."],
  ["Built to last", "We choose proven, simple architecture so Vast scales without breaking."],
];

const stats = [
  ["1", "connected data model"],
  ["6", "pipeline stages"],
  ["0", "cross-tenant leaks"],
  ["∞", "room to grow"],
];

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const signedIn = !!user;

  return (
    <div className="relative">
      <SiteHeader signedIn={signedIn} />
      <main>
        <PageHero
          eyebrow="About"
          title="We're building the calm"
          highlight="business suite"
          subtitle="Vast exists to replace the tangle of disconnected tools with one fast, unified, secure home for your business."
        />

        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-5 md:grid-cols-3">
            {values.map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <SpotlightCard className="h-full p-7">
                  <h3 className="font-display text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-white/55">{d}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="glass grid grid-cols-2 gap-6 rounded-[2rem] p-10 md:grid-cols-4">
            {stats.map(([n, l]) => (
              <div key={l} className="text-center">
                <p className="font-display text-4xl font-extrabold text-gradient">{n}</p>
                <p className="mt-2 text-xs text-white/45">{l}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
