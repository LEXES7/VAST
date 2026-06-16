"use client";

import { useState } from "react";
import { DeleteButton } from "@/components/delete-button";

type Company = { id: string; name: string; domain: string | null };

export function CompaniesList({ initial }: { initial: Company[] }) {
  const [q, setQ] = useState("");
  const items = initial.filter((c) =>
    `${c.name} ${c.domain ?? ""}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="mt-6">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search companies…"
        className="field mb-4 max-w-sm"
      />
      <div className="glass overflow-hidden rounded-2xl">
        {items.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-white/40">
            {initial.length === 0 ? "No companies yet. Add your first one above." : "No matches."}
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {items.map((c) => (
              <li key={c.id} className="group flex items-center justify-between px-5 py-3.5 transition hover:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-ember-300/30 to-ember-500/30 text-sm font-medium">
                    {c.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium">{c.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/45">{c.domain ?? "—"}</span>
                  <span className="opacity-0 transition group-hover:opacity-100">
                    <DeleteButton path={`/api/companies/${c.id}`} />
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
