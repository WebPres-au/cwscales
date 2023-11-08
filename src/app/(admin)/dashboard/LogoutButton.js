"use client";

import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <button
      onClick={handleSignOut}
      className="relative inline-flex items-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green/80"
    >
      Sign out
    </button>
  );
}
