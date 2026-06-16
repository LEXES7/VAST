import { createClient } from "@/utils/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PricingTiers } from "@/components/pricing-tiers";
import { Reveal } from "@/components/reveal";

const faqs = [
  ["Is there a free plan?", "Yes — the Free plan supports up to 3 seats with contacts, companies, and a single pipeline, forever."],
  ["Can I change plans later?", "Absolutely. Upgrade or downgrade anytime; changes are prorated automatically."],
  ["How is my data kept safe?", "Every customer's data is isolated at the database with Row-Level Security, and all access is deny-by-default."],
  ["Do you offer support?", "Plus and Pro include priority support. Pro adds a dedicated contact for your team."],
];

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const signedIn = !!user;

  return (
    <div className="relative">
      <SiteHeader signedIn={signedIn} />
      <main>
        <PageHero
          eyebrow="Pricing"
          title="Pricing that matches"
          highlight="your growth"
          subtitle="Start free. Upgrade when you're ready. No surprises, ever."
        />

        <section className="mx-auto max-w-6xl px-6 py-16">
          <PricingTiers signedIn={signedIn} />
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <Reveal className="text-center">
            <span className="eyebrow">FAQ</span>
            <h2 className="font-display mt-5 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Frequently asked questions
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col gap-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="glass group rounded-2xl px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                  {q}
                  <span className="text-ember-300 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-white/55">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
