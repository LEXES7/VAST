import { createClient } from "@/utils/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";

const posts = [
  ["Product", "Why we built Vast on a modular monolith", "The architecture choice that keeps small teams shipping features instead of fighting infrastructure.", "6 min"],
  ["Security", "Tenant isolation, done at the database", "How Row-Level Security makes cross-tenant leaks structurally impossible.", "5 min"],
  ["Design", "Designing a CRM that feels calm", "Less clutter, more clarity — the principles behind the Vast interface.", "4 min"],
  ["Engineering", "Shipping a pipeline you can feel", "Building an interface that reacts the moment you touch it.", "7 min"],
  ["Company", "No limits to how you grow", "What 'unified business suite' really means, and where we're headed.", "3 min"],
  ["Guide", "From signup to your first deal", "A two-minute tour of getting your team set up in Vast.", "2 min"],
];

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const signedIn = !!user;

  return (
    <div className="relative">
      <SiteHeader signedIn={signedIn} />
      <main>
        <PageHero
          eyebrow="Blog"
          title="Ideas on building"
          highlight="better software"
          subtitle="Notes on product, security, design, and the craft behind Vast."
        />

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map(([tag, title, excerpt, read], i) => (
              <Reveal key={title} delay={(i % 3) * 80}>
                <SpotlightCard className="flex h-full flex-col p-6">
                  <div className="mb-4 h-36 rounded-xl bg-gradient-to-br from-ember-500/25 via-ember-600/10 to-transparent" />
                  <span className="text-xs font-medium text-ember-300">{tag}</span>
                  <h3 className="font-display mt-2 text-lg font-semibold leading-snug">{title}</h3>
                  <p className="mt-2 flex-1 text-sm text-white/55">{excerpt}</p>
                  <span className="mt-4 text-xs text-white/35">{read} read</span>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
