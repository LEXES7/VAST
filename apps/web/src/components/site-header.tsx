import Link from "next/link";

const nav = [
  ["About", "/about"],
  ["Features", "/features"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
];

export function SiteHeader({ signedIn }: { signedIn: boolean }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#0a0705]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-ember-400 to-ember-600 text-sm font-bold text-black">
            V
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">Vast</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/55 md:flex">
          {nav.map(([label, href]) => (
            <Link key={label} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {signedIn ? (
            <Link href="/dashboard" className="btn-primary !px-4 !py-1.5 !text-xs">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden px-2 text-sm text-white/60 transition hover:text-white sm:block">
                Login
              </Link>
              <Link href="/login" className="btn-primary !px-4 !py-1.5 !text-xs">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
