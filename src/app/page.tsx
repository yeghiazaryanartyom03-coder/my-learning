import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";

function formatDate(date: Date | null) {
  if (!date) {
    return "No deadline";
  }

  return new Date(date).toLocaleDateString();
}

export default async function HomePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <div>Unauthorized</div>
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: currentUser.userId
    }
  })

  if (!dbUser) {
    return <div>user not found</div>
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: currentUser.userId
    },
    orderBy: {
      createdAt: "desc"
    },
  });

  const recentProjects = projects.slice(0,3)

  const overdueProjects = projects.filter((project)=>{
    if(!project.dueDate){
      return false
    }

    return (
      new Date(project.dueDate) < new Date() &&
      project.status !== "COMPLETED"
    )
  })

  return (
    <main className="min-h-screen text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1">
          <Header />

          <div className="p-6 lg:p-8">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8ea3bf]">
                  Overview
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#eaf2ff] lg:text-4xl">
                  {dbUser.name ? `Welcome back, ${dbUser.name}` : "Welcome back"}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8ea3bf]">
                  Here is a quick overview of your account, latest projects and important deadlines.
                </p>
              </div>

              <Link
                href="/projects"
                className="rounded-2xl bg-gradient-to-r from-[#2f6feb] to-[#22d3ee] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:opacity-90"
              >
                Go to Projects
              </Link>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
              <div className="space-y-6">
                <section className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-6 shadow-[0_16px_40px_rgba(2,8,23,0.22)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[#eaf2ff]">
                        Recent projects
                      </h2>

                      <p className="mt-1 text-sm text-[#8ea3bf]">
                        Your latest created projects
                      </p>
                    </div>

                    <span className="rounded-full bg-[#22d3ee]/10 px-3 py-1 text-xs font-medium text-[#22d3ee]">
                      Last 3
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    {recentProjects.length > 0 ? (
                      recentProjects.map((project) => (
                        <div
                          key={project.id}
                          className="rounded-2xl bg-[#15243d] p-4 transition hover:bg-[#1a2b47]"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-base font-semibold text-[#eaf2ff]">
                                {project.title}
                              </h3>

                              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#8ea3bf]">
                                {project.description || "No description"}
                              </p>
                            </div>

                            <span className="shrink-0 rounded-full bg-[#22d3ee]/10 px-3 py-1 text-xs font-medium text-[#22d3ee]">
                              {project.status}
                            </span>
                          </div>

                          <div className="mt-4">
                            <div className="mb-2 flex items-center justify-between text-sm">
                              <span className="text-[#8ea3bf]">Progress</span>
                              <span className="text-[#eaf2ff]">
                                {project.progress}%
                              </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-[#0f1b2d]">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#2f6feb] to-[#22d3ee]"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl bg-[#15243d] p-6 text-center">
                        <h3 className="text-base font-semibold text-[#eaf2ff]">
                          No projects yet
                        </h3>

                        <p className="mt-2 text-sm text-[#8ea3bf]">
                          Create your first project from the Projects page.
                        </p>

                        <Link
                          href="/projects"
                          className="mt-5 inline-flex rounded-xl bg-[#2f6feb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#255fd0] "
                        >
                          Create project
                        </Link>
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-6 shadow-[0_16px_40px_rgba(2,8,23,0.22)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[#eaf2ff]">
                        Overdue projects
                      </h2>

                      <p className="mt-1 text-sm text-[#8ea3bf]">
                        Projects whose deadline has already passed
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${overdueProjects.length > 0
                          ? "bg-red-500/10 text-red-400"
                          : "bg-emerald-500/10 text-emerald-400"
                        }`}
                    >
                      {overdueProjects.length > 0 ? "Needs attention" : "All good"}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    {overdueProjects.length > 0 ? (
                      overdueProjects.slice(0, 3).map((project) => (
                        <div
                          key={project.id}
                          className="rounded-2xl border border-red-500/10 bg-red-500/5 p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-base font-semibold text-[#eaf2ff]">
                                {project.title}
                              </h3>

                              <p className="mt-2 text-sm text-red-300">
                                Deadline: {formatDate(project.dueDate)}
                              </p>
                            </div>

                            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                              Overdue
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl bg-[#15243d] p-5">
                        <h3 className="text-base font-semibold text-[#eaf2ff]">
                          No overdue projects
                        </h3>

                        <p className="mt-2 text-sm text-[#8ea3bf]">
                          Great job. You do not have missed deadlines right now.
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-6 shadow-[0_16px_40px_rgba(2,8,23,0.22)]">
                  <h2 className="text-xl font-semibold text-[#eaf2ff]">
                    Quick actions
                  </h2>

                  <p className="mt-1 text-sm text-[#8ea3bf]">
                    Fast navigation through your workspace
                  </p>

                  <div className="mt-5 grid gap-3">
                    <Link
                      href="/projects"
                      className="rounded-2xl bg-[#15243d] px-4 py-4 text-sm font-semibold text-[#eaf2ff] transition hover:bg-[#1a2b47]"
                    >
                      Manage projects
                    </Link>

                    <Link
                      href="/profile"
                      className="rounded-2xl bg-[#15243d] px-4 py-4 text-sm font-semibold text-[#eaf2ff] transition hover:bg-[#1a2b47]"
                    >
                      View profile
                    </Link>

                    <Link
                      href="/settings"
                      className="rounded-2xl bg-[#15243d] px-4 py-4 text-sm font-semibold text-[#eaf2ff] transition hover:bg-[#1a2b47]"
                    >
                      Account settings
                    </Link>
                  </div>
                </section>

                <section className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-6 shadow-[0_16px_40px_rgba(2,8,23,0.22)]">
                  <h2 className="text-xl font-semibold text-[#eaf2ff]">
                    Account overview
                  </h2>

                  <p className="mt-1 text-sm text-[#8ea3bf]">
                    Your current account information
                  </p>

                  <div className="mt-5 grid gap-4">
                    <div className="rounded-2xl bg-[#15243d] p-4">
                      <p className="text-sm text-[#8ea3bf]">Name</p>

                      <p className="mt-2 break-all text-base font-semibold text-[#eaf2ff]">
                        {dbUser.name || "No name"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#15243d] p-4">
                      <p className="text-sm text-[#8ea3bf]">Email</p>

                      <p className="mt-2 break-all text-base font-semibold text-[#eaf2ff]">
                        {dbUser.email}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#15243d] p-4">
                      <p className="text-sm text-[#8ea3bf]">Joined</p>

                      <p className="mt-2 text-base font-semibold text-[#eaf2ff]">
                        {dbUser.created.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
