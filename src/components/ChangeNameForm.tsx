"use client";

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner";
import { getAxiosErrorMessage } from "@/lib/getAxiosErrorMessage";
import { api } from "@/lib/api";

interface SettingsFormProps {
  initialName: string;
}

export function ChangeNameForm({ initialName }: SettingsFormProps) {
  const [name, setName] = useState(initialName)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await api.patch("/api/settings/change-name", {
        action: "name-change",
        name,
      });
      toast.success("Profile Name updated successfully")
      router.refresh()
    } catch (error) {
      console.log(error);

      toast.error(
        getAxiosErrorMessage(error, "Failed to update name")
      );
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form
      onSubmit={handleSave}
      className="rounded-2xl bg-slate-800 p-6 shadow-lg"
    >
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-slate-900 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}