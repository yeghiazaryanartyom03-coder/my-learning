"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

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
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      toast.success("registration success")
      router.push("/login");
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
        </form>
      </div>
    </main>
  );
}
