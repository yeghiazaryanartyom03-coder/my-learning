import { Header } from "@/components/Header";
import { ChangeNameForm } from "@/components/ChangeNameForm";
import { Sidebar } from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { ChangeEmailForm } from "@/components/ChangeEmailForm";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";

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
            
              <ChangeNameForm
                initialName={dbUser.name ?? ""}
              />

              <ChangeEmailForm currentEmail={dbUser.email} />
              <ChangePasswordForm />
          </div>
        </section>
      </div>
    </main>
  );
}
