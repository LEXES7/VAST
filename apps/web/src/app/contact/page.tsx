import { createClient } from "@/utils/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const signedIn = !!user;

  return (
    <div className="relative">
      <SiteHeader signedIn={signedIn} />
      <main>
        <PageHero
          eyebrow="Contact"
          title="Let's talk about"
          highlight="your team"
          subtitle="Questions, demos, or just curious? We'd love to hear from you."
        />

        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <form action="/login" className="glass rounded-3xl p-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="label">Name</label>
                    <input className="field" placeholder="Jane Doe" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="label">Work email</label>
                    <input type="email" className="field" placeholder="jane@company.com" />
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-1.5">
                  <label className="label">Message</label>
                  <textarea rows={5} className="field resize-none" placeholder="Tell us what you're looking for…" />
                </div>
                <button type="submit" className="btn-primary mt-5 w-full">Send message</button>
              </form>
            </Reveal>

            <Reveal delay={120}>
              <div className="glass flex h-full flex-col gap-6 rounded-3xl p-7">
                <div>
                  <p className="label">Email</p>
                  <p className="mt-1 text-sm text-white/80">hello@vast.app</p>
                </div>
                <div>
                  <p className="label">Support</p>
                  <p className="mt-1 text-sm text-white/80">support@vast.app</p>
                </div>
                <div>
                  <p className="label">Response time</p>
                  <p className="mt-1 text-sm text-white/80">Usually within a day</p>
                </div>
                <div className="mt-auto rounded-2xl border border-ember-500/20 bg-ember-500/[0.06] p-4 text-sm text-white/70">
                  Prefer to dive in? <a href="/login" className="text-ember-300 underline">Create your workspace →</a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
