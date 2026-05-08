"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { getAxiosErrorMessage } from "@/lib/getAxiosErrorMessage";
import { api } from "@/lib/api";

interface ChangeEmailFormProps {
    currentEmail: string,
}

export function ChangeEmailForm({ currentEmail }: ChangeEmailFormProps) {
    const [newEmail, setNewEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newEmail || !currentPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newEmail === currentEmail) {
            toast.error("New email must be different from current email");
            return;
        }

        try {
            setIsLoading(true)

            await api.patch("/api/settings/change-email", {
                newEmail,
                currentPassword

            })

            toast.success("Email updated successfully")

            setNewEmail("")
            setCurrentPassword("")

            router.refresh()
        } catch (error) {
            console.log(error);

            toast.error(
                getAxiosErrorMessage(error, "Failed to change email")
            );
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-2xl bg-slate-800 p-6 shadow-lg"
        >
            <h2 className="mb-2 text-2xl font-bold">Email address</h2>

            <p className="mb-6 text-sm text-slate-400">
                To change your email, enter your new email and confirm your current password.
            </p>

            <div className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm text-slate-400">
                        Current email
                    </label>

                    <input
                        value={currentEmail}
                        disabled
                        className="w-full cursor-not-allowed rounded-lg bg-slate-900 p-3 text-slate-400 outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-400">
                        New email
                    </label>

                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full rounded-lg bg-slate-900 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new email"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-400">
                        Current password
                    </label>

                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full rounded-lg bg-slate-900 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter current password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? "Updating..." : "Update email"}
                </button>
            </div>
        </form>
    )
}