import { apiFetch } from "@/utils/api";
import { AddCompanyForm } from "@/components/add-company-form";

type Company = { id: string; name: string; domain: string | null };

export default async function CompaniesPage() {
  const res = await apiFetch("/api/companies");
  const companies: Company[] = res.ok ? await res.json() : [];

  return (
    <section className="animate-fade-up">
      <h1 className="font-display text-3xl font-bold tracking-tight">Companies</h1>
      <p className="mb-6 mt-1 text-sm text-white/45">
        {companies.length} {companies.length === 1 ? "company" : "companies"}
      </p>

      <AddCompanyForm />

      <div className="glass mt-6 overflow-hidden rounded-2xl">
        {companies.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-white/40">
            No companies yet. Add your first one above.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {companies.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between px-5 py-3.5 transition hover:bg-white/[0.03]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-ember-300/30 to-ember-400/30 text-sm font-medium">
                    {c.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium">{c.name}</span>
                </div>
                <span className="text-sm text-white/45">{c.domain ?? "—"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
