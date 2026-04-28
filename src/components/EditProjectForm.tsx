"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios";


interface Project{
  title:string,
  description: string | null,
  progress: number,
  id: string,
  status: string,
  dueDate: Date | null
}

interface EditProjectForm{
  project: Project,
  onSuccess: () => void,
  onCancel: () => void,
}

export function EditProjectForm({
  project,
  onCancel,
  onSuccess
}:EditProjectForm){
  const router = useRouter()

  const [ title, setTitle ] = useState(project.title)
  const [ progress, setProgress ] = useState(project.progress)
  const [ description, setDescription] = useState<string|null>(project.description)
  const [ status, setStatus ] = useState(project.status)
  const [ dueDate, setDueDate ] = useState(
    project.dueDate
      ? new Date(project.dueDate).toISOString().split("T")[0]
      : "")
  const [ isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      setIsLoading(true)

      await axios.patch(`api/projects/${project.id}`,{
        title,
        progress,
        description: description || null,
        status,
        dueDate: dueDate || null
      })

      router.refresh()
      onSuccess?.()

    }catch(error){
      console.error(error)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 space-y-4 rounded-2xl border border-white/5 bg-[#0b1220] p-4"
    >
      <input 
        value={title}
        onChange={(e) => {setTitle(e.target.value)}}
        className="mt-5 space-y-4 rounded-2xl border border-white/5 bg-[#0b1220] p-4"
      />
      <textarea
        value={description ?? ""}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#101a2d] px-4 py-3 text-white outline-none"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#101a2d] px-4 py-3 text-white outline-none"
      >
        <option value="PLANNING">PLANNING</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>

      <input
        type="number"
        value={progress}
        min={0}
        max={100}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-full rounded-xl border border-white/10 bg-[#101a2d] px-4 py-3 text-white outline-none"
      />

      <input 
        type="date" 
        value={dueDate} 
        onChange={(e)=> setDueDate(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#101a2d] px-4 py-3 text-white outline-none"
      />

      <div className="flex gap-3">
        <button
          disabled={isLoading}
          className="rounded-xl bg-[#2f6feb] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-[#8ea3bf]"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}