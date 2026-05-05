"use client"

import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"
import { getAxiosErrorMessage } from "@/lib/getAxiosErrorMessage";

export function ChangePasswordForm() {
    const [newPassword, setNewPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("please fill all fields")
            return
        }

        if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters")
            return
        }

        if (newPassword === currentPassword) {
            toast.error("Dont write current password")
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error("Password do not match")
            return
        }

        try {
            setLoading(true)

            await axios.patch("/api/settings/change-password", {
                newPassword,
                currentPassword,
            })

            toast.success("Password changed successfully")

            setConfirmPassword("")
            setCurrentPassword("")
            setNewPassword("")


        } catch (error) {
            console.log(error);
            toast.error(
                getAxiosErrorMessage(error, "Failed to change password")
            );
        } finally {
            setLoading(false);
        }
    }





    return (
        <form
            onSubmit={handleChangePassword}
            className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-lg"
        >
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">Change password</h2>
                <p className="mt-1 text-sm text-slate-400">
                    Update your account password.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                        Current password
                    </label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                        placeholder="Enter current password"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                        New password
                    </label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                        placeholder="Enter new password"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                        Confirm new password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                        placeholder="Repeat new password"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
                {loading ? "Changing..." : "Change password"}
            </button>
        </form>
    )
}