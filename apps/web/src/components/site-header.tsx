import Link from "next/link";

export function SiteHeader({ signedIn }: { signedIn: boolean }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#050509]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-ember-500 to-ember-400 text-sm font-bold">
            V
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">Vast</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-white/55 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#pipeline" className="transition hover:text-white">Pipeline</a>
          <a href="#pricing" className="transition hover:text-white">Pricing</a>
          <a href="#security" className="transition hover:text-white">Security</a>
        </nav>

        <div className="flex items-center gap-2">
          {signedIn ? (
            <Link href="/dashboard" className="btn-primary !px-4 !py-1.5 !text-xs">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden px-3 text-sm text-white/60 transition hover:text-white sm:block">
                Sign in
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
