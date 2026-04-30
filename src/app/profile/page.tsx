import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return <div>Unauthorized</div>
  }

  const dbUser = await prisma.user.findUnique({
    where:{
      id: currentUser.userId
    }
  })

  if(!dbUser) {
    return <div>User not found</div>
  }

  return (
    <main className="min-h-screen text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1">
          <Header />

          <div className="p-6 lg:p-8">
            {currentUser ? (
              <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
                <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-6 shadow-[0_16px_40px_rgba(2,8,23,0.22)]">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-[#2f6feb] to-[#22d3ee] text-3xl font-bold text-white shadow-[0_12px_30px_rgba(47,111,235,0.35)]">
                      {dbUser.name?.[0] ?? "A"}
                    </div>

                    <h1 className="mt-4 text-2xl font-semibold text-[#eaf2ff]">
                      {dbUser.name ?? "No name"}
                    </h1>

                    <p className="mt-1 text-sm text-[#8ea3bf]">
                      {dbUser.email}
                    </p>

                    <span className="mt-4 rounded-full bg-[#22d3ee]/10 px-3 py-1 text-xs font-medium text-[#22d3ee]">
                      Active account
                    </span>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-6 shadow-[0_16px_40px_rgba(2,8,23,0.22)]">
                  <h2 className="text-2xl font-semibold text-[#eaf2ff]">
                    Account information
                  </h2>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#15243d] p-4">
                      <p className="text-sm text-[#8ea3bf]">Full name</p>
                      <p className="mt-2 text-lg font-semibold text-[#eaf2ff]">
                        {dbUser.name ?? "No name"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#15243d] p-4">
                      <p className="text-sm text-[#8ea3bf]">Email address</p>
                      <p className="mt-2 text-lg font-semibold text-[#eaf2ff] break-all">
                        {dbUser.email}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#15243d] p-4 sm:col-span-2">
                      <p className="text-sm text-[#8ea3bf]">Account ID</p>
                      <p className="mt-2 text-lg font-semibold text-[#eaf2ff] break-all">
                        {dbUser.id}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/5 bg-white/3 p-4">
                    <p className="text-sm text-[#8ea3bf]">
                      This page contains your personal account data. You can update your information in Settings.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-6">
                <p className="text-[#8ea3bf]">No user found in database.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}