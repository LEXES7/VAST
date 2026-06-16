import { apiFetch } from "@/utils/api";
import { TasksView } from "@/components/tasks-view";

type Task = { id: string; title: string; status: string; dueDate: string | null };

export default async function TasksPage() {
  const res = await apiFetch("/api/tasks");
  const tasks: Task[] = res.ok ? await res.json() : [];
  return <TasksView initial={tasks} />;
}
