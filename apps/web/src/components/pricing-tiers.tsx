import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    note: "For small teams getting started",
    features: ["Up to 3 seats", "Contacts & companies", "Single pipeline", "Community support"],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Plus",
    price: "$29",
    note: "For growing teams",
    features: ["Unlimited seats", "Multiple pipelines", "Roles & permissions", "Priority support"],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Pro",
    price: "$59",
    note: "For scaling businesses",
    features: ["Everything in Plus", "Advanced reporting", "Audit log & SSO", "Dedicated support"],
    cta: "Talk to us",
    featured: false,
  },
];

export function PricingTiers({ signedIn }: { signedIn: boolean }) {
  const href = signedIn ? "/dashboard" : "/login";
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {tiers.map((t) => (
        <div
          key={t.name}
          className={`glass relative rounded-3xl p-7 ${
            t.featured ? "ring-1 ring-ember-500/50" : ""
          }`}
        >
          {t.featured && (
            <>
              <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-ember-500/30 blur-3xl" />
              <span className="absolute right-6 top-6 rounded-full bg-ember-500 px-2.5 py-1 text-[10px] font-semibold text-black">
                Best value
              </span>
            </>
          )}
          <h3 className="font-display text-lg font-semibold">{t.name}</h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-display text-4xl font-extrabold">{t.price}</span>
            <span className="text-sm text-white/40">/user / mo</span>
          </div>
          <p className="mt-2 text-sm text-white/45">{t.note}</p>

          <ul className="mt-6 space-y-3">
            {t.features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ember-500/15 text-xs text-ember-300">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>

          <Link
            href={href}
            className={`mt-7 block text-center ${t.featured ? "btn-primary w-full" : "btn-ghost w-full"}`}
          >
            {t.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
