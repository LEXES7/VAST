import Link from "next/link";
import { Logo } from "@/components/logo";

const groups = [
  {
    title: "Product",
    links: [
      ["Features", "/features"],
      ["Pricing", "/pricing"],
      ["Blog", "/blog"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Login", "/login"],
    ],
  },
  {
    title: "Account",
    links: [
      ["Get started", "/login"],
      ["Dashboard", "/dashboard"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-white/45">
            A modern, unified business suite. No limits to how you grow.
          </p>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">{g.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {g.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/55 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-white/40 sm:flex-row">
          <span>© 2026 Vast. All rights reserved.</span>
          <span className="font-display tracking-[0.2em]">NO LIMITS TO HOW YOU GROW</span>
        </div>
      </div>
    </footer>
  );
}
