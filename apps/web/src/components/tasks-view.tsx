"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetchClient } from "@/utils/api-client";
import { DeleteButton } from "@/components/delete-button";

type Task = { id: string; title: string; status: string; dueDate: string | null };

const STATUSES = [
  { value: "todo", label: "To do" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
] as const;

export function TasksView({ initial }: { initial: Task[] }) {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [loading, setLoading] = useState(false);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await apiFetchClient("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title, ...(due ? { dueDate: new Date(due).toISOString() } : {}) }),
    });
    setLoading(false);
    if (res.ok) {
      const task = await res.json();
      setTasks((t) => [task, ...t]);
      setTitle("");
      setDue("");
      router.refresh();
    }
  }

  async function setStatus(id: string, status: string) {
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status } : t)));
    await apiFetchClient(`/api/tasks/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    router.refresh();
  }

  const byStatus = (s: string) => tasks.filter((t) => t.status === s);

  return (
    <section className="animate-fade-up">
      <h1 className="font-display text-3xl font-bold tracking-tight">Tasks</h1>
      <p className="mb-6 mt-1 text-sm text-white/45">{tasks.length} tasks · keep work moving</p>

      <form onSubmit={add} className="glass flex flex-wrap items-end gap-3 rounded-2xl p-4">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="label">New task</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Follow up with Acme…" className="field" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="label">Due</label>
          <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="field" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
          {loading ? "Adding…" : "Add task"}
        </button>
      </form>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {STATUSES.map((col) => {
          const items = byStatus(col.value);
          return (
            <div key={col.value} className="glass rounded-2xl p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">{col.label}</h2>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/40">{items.length}</span>
              </div>
              <div className="flex flex-col gap-2">
                {items.length === 0 && (
                  <p className="rounded-xl border border-dashed border-white/10 py-5 text-center text-xs text-white/25">
                    Nothing here
                  </p>
                )}
                {items.map((t) => (
                  <div key={t.id} className="group rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:bg-white/[0.06]">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-medium leading-snug ${t.status === "done" ? "text-white/40 line-through" : ""}`}>
                        {t.title}
                      </p>
                      <span className="opacity-0 transition group-hover:opacity-100">
                        <DeleteButton path={`/api/tasks/${t.id}`} />
                      </span>
                    </div>
                    {t.dueDate && (
                      <p className="mt-1 text-[11px] text-white/40">
                        Due {new Date(t.dueDate).toLocaleDateString()}
                      </p>
                    )}
                    <select
                      value={t.status}
                      onChange={(e) => setStatus(t.id, e.target.value)}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-white/60 focus:border-ember-500/60 focus:outline-none"
                    >
                      {STATUSES.map((s) => (
                        <option key={s.value} value={s.value} className="bg-[#0c0c14]">{s.label}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
