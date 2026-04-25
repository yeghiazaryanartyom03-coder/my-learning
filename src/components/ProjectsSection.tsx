"use client";

import { useState } from "react";
import { AddProjectForm } from "./AddProjectForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { EditProjectForm } from "./EditProjectForm";

interface Project {
  id: string;
  title: string;
  description: string | null;
  status: string;
  progress: number;
  createdAt: Date;
  userId: string;
}

interface ProjectsSectionInterface {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionInterface) {
  const [isOpen, setIsOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();
  const handleDeleting = async (id: string) => {
    try {
      setDeletingId(id);

      await axios.delete(`api/projects/${id}`);

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[#8ea3bf]">
            Workspace
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#eaf2ff]">
            My Projects
          </h1>

          <p className="mt-2 text-sm text-[#8ea3bf]">
            Track progress, status and deadlines of your projects
          </p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-2xl bg-linear-to-r from-[#2f6feb] to-[#22d3ee] px-5 py-3 font-medium text-white shadow-lg cursor-pointer"
        >
          {isOpen ? "Close Form" : "+ New Project"}
        </button>
      </div>

      {isOpen && (
        <div className="mb-8">
          <AddProjectForm
            onSuccess={() => {
              setIsOpen(false);
            }}
          />
        </div>
      )}

      {projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-6 shadow-[0_16px_40px_rgba(2,8,23,0.22)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#eaf2ff]">
                    {project.title}
                  </h2>

                  <p className="mt-2 text-sm text-[#8ea3bf]">
                    {project.description || "No description"}
                  </p>
                </div>

                <span className="rounded-full bg-[#22d3ee]/10 px-3 py-1 text-xs font-medium text-[#22d3ee]">
                  {project.status}
                </span>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#8ea3bf]">Progress</span>
                  <span className="text-white">{project.progress}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#15243d]">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-[#2f6feb] to-[#22d3ee]"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 text-sm text-[#8ea3bf]">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </div>

              <button
                onClick={() => handleDeleting(project.id)}
                type="button"
                disabled={deletingId === project.id}
                className="rounded-xl border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deletingId === project.id ? "Deleting..." : "Delete"}
              </button>
              <button
                type="button"
                onClick={() => setEditingId(project.id)}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-[#8ea3bf] transition hover:bg-white/5"
              >
                Edit
              </button>
              {editingId === project.id && (
                <EditProjectForm
                  project={project}
                  onSuccess={() => setEditingId(null)}
                  onCancel={() => setEditingId(null)}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">No projects yet</h2>

          <p className="mt-2 text-[#8ea3bf]">
            Create your first project to start tracking progress
          </p>
        </div>
      )}
    </>
  );
}
