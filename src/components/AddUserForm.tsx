"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddUserForm(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")

  const router = useRouter()

  const handleSubmit = async () => {
    await axios.post("/api/users",{
        name,
        email,
    })
    setEmail("")
    setName("")

    router.refresh()
  }

  return (
    <div className="rounded-xl bg-slate-800 p-4">
      <h2 className="mb-4 text-xl font-bold">
        Add User
      </h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-3 w-full rounded-lg p-3 text-black"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-3 w-full rounded-lg p-3 text-black"
      />

      <button
        onClick={handleSubmit}
        className="rounded-lg bg-blue-600 px-4 py-2"
      >
        Add User
      </button>
    </div>
  );

}