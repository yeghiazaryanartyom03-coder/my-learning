"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddProjectFormProps{
  onSuccess?: ()=> void;
}

export function AddProjectForm({onSuccess}: AddProjectFormProps ){
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("in Progress");
  const [description, setDescription ] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = async () => {
    try{
      await axios.post("/api/projects",{
        title,
        status,
        description,
        progress,
      })

      setProgress(0);
      setDescription("");
      setStatus("")
      setTitle("");
      onSuccess?.()
      router.refresh()
    }catch(error){
      console.log(error)
    }
  };

  return(
     <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-6 shadow-[0_16px_40px_rgba(2,8,23,0.22)]">
      <h2 className="text-2xl font-semibold text-white">
        Create New Project
      </h2>

      <div className="mt-6 space-y-4">
        <input
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-2xl bg-[#15243d] p-4 text-white outline-none"
        />

        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-30 w-full rounded-2xl bg-[#15243d] p-4 text-white outline-none"
        />

        <input
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-2xl bg-[#15243d] p-4 text-white outline-none"
        />

        <input
          type="number"
          placeholder="Progress %"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full rounded-2xl bg-[#15243d] p-4 text-white outline-none"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-2xl bg-linear-to-r from-[#2f6feb] to-[#22d3ee] px-6 py-3 font-medium text-white shadow-lg cursor-pointer"
        >
          Create Project
        </button>
      </div>
    </div>
  )

}