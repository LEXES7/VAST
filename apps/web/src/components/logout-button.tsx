"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      className="rounded-md border border-white/15 px-3 py-1.5 text-sm text-white/70 hover:text-white"
    >
      Sign out
    </button>
  );
}
