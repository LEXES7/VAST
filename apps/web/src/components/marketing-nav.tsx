import Link from "next/link";

export function MarketingNav({ signedIn }: { signedIn: boolean }) {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="glass flex w-full max-w-3xl items-center justify-between rounded-full px-5 py-2.5">
        <Link href="/" className="font-display text-lg font-extrabold tracking-tight">
          Vast
        </Link>
        <div className="flex items-center gap-2">
          <a href="#features" className="hidden px-3 text-sm text-white/55 transition hover:text-white sm:block">
            Features
          </a>
          {signedIn ? (
            <Link href="/dashboard" className="btn-primary !px-4 !py-1.5 !text-xs">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="btn-primary !px-4 !py-1.5 !text-xs">
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
