import { Header } from "@/components/Header";
import { SettingsForm } from "@/components/SettingsForm";
import { Sidebar } from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return <div>Unauthorized</div>
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: currentUser?.userId
    }
  })

  if(!dbUser){
   return <div>user not found</div>
  }

  return (
    <main className="min-h-screen text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1">
          <Header />

          <div className="p-6 lg:p-8 ">
            {currentUser ? (
              <SettingsForm
                initialName={dbUser.name ?? ""}
                initialEmail={dbUser.email}
              />
            ) : (
              <p className="text-slate-400">No user found in database.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
