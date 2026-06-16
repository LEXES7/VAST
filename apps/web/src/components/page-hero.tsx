export function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <div className="enter mx-auto max-w-3xl px-6 pt-36 text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="font-display mt-5 text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h1>
      {subtitle && <p className="mx-auto mt-5 max-w-xl text-balance text-white/55">{subtitle}</p>}
    </div>
  );
}
