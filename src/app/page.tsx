import { DashboardCards } from "@/components/DashboardCards";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const currentUser = await prisma.user.findFirst();

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
                  Welcome back
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#eaf2ff] lg:text-4xl">
                  {currentUser?.name ? `${currentUser.name}'s Dashboard` : "Your Dashboard"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8ea3bf]">
                  Here is a quick overview of your account activity, usage and subscription status.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/3 px-4 py-3 text-sm text-[#8ea3bf]">
                Last update: just now
              </div>
            </div>

            <DashboardCards />

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
              <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-6 shadow-[0_16px_40px_rgba(2,8,23,0.22)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[#eaf2ff]">
                      Recent activity
                    </h2>
                    <p className="mt-1 text-sm text-[#8ea3bf]">
                      Your latest actions across the workspace
                    </p>
                  </div>

                  <span className="rounded-full bg-[#22d3ee]/10 px-3 py-1 text-xs font-medium text-[#22d3ee]">
                    Live
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      title: "Profile updated",
                      time: "2 minutes ago",
                      text: "Your account information was successfully updated.",
                    },
                    {
                      title: "New billing cycle started",
                      time: "Today, 09:24",
                      text: "Your Pro subscription was renewed automatically.",
                    },
                    {
                      title: "Analytics report generated",
                      time: "Yesterday",
                      text: "Monthly usage report is now available in Analytics.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl bg-[#15243d] p-4 transition duration-200 hover:bg-[#1a2b47]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-semibold text-[#eaf2ff]">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[#8ea3bf]">
                            {item.text}
                          </p>
                        </div>

                        <span className="shrink-0 text-xs text-[#8ea3bf]">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-6 shadow-[0_16px_40px_rgba(2,8,23,0.22)]">
                  <h2 className="text-xl font-semibold text-[#eaf2ff]">
                    Current plan
                  </h2>
                  <p className="mt-1 text-sm text-[#8ea3bf]">
                    Subscription overview
                  </p>

                  <div className="mt-6 rounded-2xl bg-[#15243d] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#8ea3bf]">Plan</p>
                        <p className="mt-1 text-2xl font-semibold text-[#eaf2ff]">
                          Pro Plan
                        </p>
                      </div>

                      <span className="rounded-full bg-[#22c55e]/10 px-3 py-1 text-xs font-medium text-[#22c55e]">
                        Active
                      </span>
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-[#8ea3bf]">Usage</span>
                        <span className="text-[#eaf2ff]">82%</span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-[#0f1b2d]">
                        <div className="h-full w-[82%] rounded-full bg-linear-to-r from-[#2f6feb] to-[#22d3ee]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-6 shadow-[0_16px_40px_rgba(2,8,23,0.22)]">
                  <h2 className="text-xl font-semibold text-[#eaf2ff]">
                    Quick overview
                  </h2>

                  <div className="mt-5 grid gap-4">
                    <div className="rounded-2xl bg-[#15243d] p-4">
                      <p className="text-sm text-[#8ea3bf]">Email</p>
                      <p className="mt-2 break-all text-base font-semibold text-[#eaf2ff]">
                        {currentUser?.email ?? "No email"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#15243d] p-4">
                      <p className="text-sm text-[#8ea3bf]">Account status</p>
                      <p className="mt-2 text-base font-semibold text-[#eaf2ff]">
                        Verified & active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
