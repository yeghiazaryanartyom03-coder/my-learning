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
  dueDate: Date | null;
}

interface ProjectsSectionInterface {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionInterface) {
  const [isOpen, setIsOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchTitle, setSearchTitle] = useState("");

  const statuses = ["ALL", "IN_PROGRESS", "COMPLETED", "PLANNING"];

  const router = useRouter();

  const filtredProjects = projects.filter((project) => {
    return (
      (selectedStatus === "ALL" || project.status === selectedStatus) &&
      project.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  });

  const handleDeleting = async (id: string) => {
    try {
      setDeletingId(id);

      await axios.delete(`/api/projects/${id}`);

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const totalProjects = projects.length;

  const inProgressProjects = projects.filter(
    (project) => project.status === "IN_PROGRESS",
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "COMPLETED",
  ).length;

  const averageProgress =
    totalProjects > 0
      ? Math.round(
          projects.reduce((sum, project) => sum + project.progress, 0) /
            totalProjects,
        )
      : 0;

  const overdueProjects = projects.filter(
    (project) =>
      project.dueDate &&
      new Date(project.dueDate) < new Date() &&
      project.status !== "COMPLETED",
  ).length;

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

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-2xl bg-linear-to-r from-[#2f6feb] to-[#22d3ee] px-5 py-3 font-medium text-white shadow-lg cursor-pointer mt-3.5"
          >
            {isOpen ? "Close Form" : "+ New Project"}
          </button>
          <div className="mb-8 grid gap-4 grid-cols-4 mt-5">
            <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-5 ">
              <p className="text-sm text-[#8ea3bf]">Total Projects</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                {totalProjects}
              </h2>
            </div>

            <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-5 ">
              <p className="text-sm text-[#8ea3bf]">In Progress</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                {inProgressProjects}
              </h2>
            </div>

            <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-5">
              <p className="text-sm text-[#8ea3bf]">Completed</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                {completedProjects}
              </h2>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-5">
              <p className="text-sm text-[#8ea3bf]">Overdue Projects</p>

              <h2 className={`mt-3 text-3xl font-semibold ${overdueProjects>0?"text-red-400":"text-white"} `}>
                {overdueProjects}
              </h2>
            </div>
            <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-5">
              <p className="text-sm text-[#8ea3bf]">Average Progress</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                {averageProgress}%
              </h2>
            </div>
          </div>
          <p className="mt-2 text-sm text-[#8ea3bf]">
            Track progress, status and deadlines of your projects
          </p>
        </div>
      </div>
      <div className="mb-8 flex flex-wrap gap-3">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setSelectedStatus(status)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              selectedStatus === status
                ? "bg-[#22d3ee] text-[#020617]"
                : "border border-white/10 text-[#8ea3bf] hover:bg-white/5"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-[#101a2d] px-5 py-4 text-white outline-none placeholder:text-[#8ea3bf]"
        />
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

      {filtredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtredProjects.map((project) => (
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
              <div className="mt-4 text-sm text-[#8ea3bf]">
                Due Date:{" "}
                {project.dueDate
                  ? new Date(project.dueDate).toLocaleDateString()
                  : "No deadline"}
              </div>
              {project.dueDate &&
                new Date(project.dueDate) < new Date() &&
                project.status !== "COMPLETED" && (
                  <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
                    ⚠ This project is overdue
                  </div>
                )}
              <button
                onClick={() => handleDeleting(project.id)}
                type="button"
                disabled={deletingId === project.id}
                className="rounded-xl border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 "
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
