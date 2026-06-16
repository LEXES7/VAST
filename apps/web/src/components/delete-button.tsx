"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetchClient } from "@/utils/api-client";

export function DeleteButton({ path }: { path: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function del() {
    if (!window.confirm("Delete this item? This can't be undone.")) return;
    setBusy(true);
    const res = await apiFetchClient(path, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  return (
    <button
      onClick={del}
      disabled={busy}
      aria-label="Delete"
      className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition hover:bg-red-500/15 hover:text-red-400 disabled:opacity-40"
    >
      ✕
    </button>
  );
}
