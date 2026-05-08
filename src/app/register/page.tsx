"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await api.post("/api/auth/register", {
        name,
        email,
        password,
      });
      router.push("/login");
      toast.success("registration success")
    } catch (error) {
      console.error(error);

      toast.error("registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/5 bg-[#101a2d]/90 p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-white">Register</h1>

        <p className="mt-2 text-sm text-[#8ea3bf]">
          Create your dashboard account
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-[#8ea3bf]">Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#8ea3bf]">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#8ea3bf]">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-linear-to-r from-[#2f6feb] to-[#22d3ee] px-5 py-3 font-medium text-white shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Creating..." : "Create account"}
          </button>
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?
            </p>

            <Link
              href="/login"
              className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-blue-500 hover:bg-slate-800 hover:text-white"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
