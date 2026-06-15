import { apiFetch } from "@/utils/api";
import { AddCompanyForm } from "@/components/add-company-form";

type Company = { id: string; name: string; domain: string | null };

export default async function CompaniesPage() {
  const res = await apiFetch("/api/companies");
  const companies: Company[] = res.ok ? await res.json() : [];

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold">Companies</h1>
      <AddCompanyForm />
      <ul className="mt-8 divide-y divide-white/10">
        {companies.length === 0 && (
          <li className="py-6 text-sm text-white/40">
            No companies yet. Add your first one above.
          </li>
        )}
        {companies.map((c) => (
          <li key={c.id} className="flex items-center justify-between py-3">
            <span className="font-medium">{c.name}</span>
            <span className="text-sm text-white/50">{c.domain ?? "—"}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
