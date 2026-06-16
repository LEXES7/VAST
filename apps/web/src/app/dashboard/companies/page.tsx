import { apiFetch } from "@/utils/api";
import { AddCompanyForm } from "@/components/add-company-form";
import { CompaniesList } from "@/components/companies-list";

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
      <CompaniesList initial={companies} />
    </section>
  );
}
