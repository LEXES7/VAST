import { notFound } from "next/navigation";
import { apiFetch } from "@/utils/api";
import { ContactDetail } from "@/components/contact-detail";

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await apiFetch(`/api/contacts/${id}`);
  if (!res.ok) notFound();
  const contact = await res.json();
  return <ContactDetail contact={contact} />;
}
