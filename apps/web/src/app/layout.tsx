import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from "@/components/aurora-background";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Refined editorial display face. Swap for a licensed font (e.g. CS Despina) later
// by replacing this with next/font/local — the rest of the app uses var(--font-display).
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vast — No limits to how you grow",
  description: "A modern, unified business suite. Clean UX. One data model. Secure by design.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen antialiased">
        <AuroraBackground />
        {children}
      </body>
    </html>
  );
}
