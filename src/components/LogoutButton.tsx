"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
      toast.error("Logout failed");
    }
  };
  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-xl border border-white/10 px-4 py-2 text-sm text-[#8ea3bf] hover:bg-white/5 cursor-pointer"
    >
      Logout
    </button>
  );
}
