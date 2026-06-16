"use client";

import { useState } from "react";
import Link from "next/link";
import { DeleteButton } from "@/components/delete-button";

type Contact = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
};

export function ContactsList({ initial }: { initial: Contact[] }) {
  const [q, setQ] = useState("");
  const items = initial.filter((c) =>
    `${c.firstName} ${c.lastName ?? ""} ${c.email ?? ""}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="mt-6">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search contacts…"
        className="field mb-4 max-w-sm"
      />
      <div className="glass overflow-hidden rounded-2xl">
        {items.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-white/40">
            {initial.length === 0 ? "No contacts yet. Add your first one above." : "No matches."}
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {items.map((c) => (
              <li key={c.id} className="group flex items-center justify-between px-5 py-3.5 transition hover:bg-white/[0.03]">
                <Link href={`/dashboard/contacts/${c.id}`} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-ember-500/40 to-ember-600/30 text-sm font-medium">
                    {c.firstName.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium group-hover:text-ember-300">
                    {c.firstName} {c.lastName ?? ""}
                  </span>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/45">{c.email ?? c.phone ?? "—"}</span>
                  <span className="opacity-0 transition group-hover:opacity-100">
                    <DeleteButton path={`/api/contacts/${c.id}`} />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
