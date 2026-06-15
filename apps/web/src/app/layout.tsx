import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vast — No limits to how you grow",
  description: "A modern, unified business suite. The flagship is CRM / Sales.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
