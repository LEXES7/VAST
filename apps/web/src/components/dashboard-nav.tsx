"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Contacts" },
  { href: "/dashboard/companies", label: "Companies" },
  { href: "/dashboard/deals", label: "Deals" },
];

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav className="glass flex gap-1 rounded-full p-1">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              active
                ? "bg-white text-black"
                : "text-white/55 hover:text-white"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
