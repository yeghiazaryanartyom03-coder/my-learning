"use client";

import axios from "axios"
import {useRouter} from "next/navigation"
import { useState } from "react"

interface SettingsFormProps {
  initialName: string;
  initialEmail: string;
}

export function SettingsForm({initialEmail,initialName}:SettingsFormProps){
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)

  const router = useRouter()

  const handleSave = async () => {
    try{
      await axios.patch("/api/profile", {
        name,
        email,
      });

      router.refresh()
    }catch(error){
      console.log(error)
    }
  }
   return (
    <div className="rounded-2xl bg-slate-800 p-6 shadow-lg">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-slate-400">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg p-3 text-black"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg p-3 text-black"
            placeholder="Enter your email"
          />
        </div>

        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white cursor-pointer"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}