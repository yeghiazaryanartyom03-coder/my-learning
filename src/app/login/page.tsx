"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await axios.post("/api/auth/login", {
        email,
        password,
      });
      toast.success("login successfull")
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/5 bg-[#101a2d]/90 p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-white">Login</h1>

        <p className="mt-2 text-sm text-[#8ea3bf]">
          Welcome back to your dashboard
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
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
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
