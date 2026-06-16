// A template re-mounts on every navigation, so this gives a gentle
// fade-in page transition on each route change. Opacity-only (see globals.css).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
