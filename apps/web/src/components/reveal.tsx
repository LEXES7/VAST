// Entrance wrapper. Content is ALWAYS visible; the fade-up is a pure-CSS
// enhancement that only runs when the user hasn't asked for reduced motion
// (see the `.enter` rule in globals.css). It can never leave content hidden.
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`enter ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
