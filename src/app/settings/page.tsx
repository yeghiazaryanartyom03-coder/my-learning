import { Header } from "@/components/Header";
import { SettingsForm } from "@/components/SettingsForm";
import { Sidebar } from "@/components/Sidebar";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const currentUser = await prisma.user.findFirst();

  return (
    <main className="min-h-screen text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1">
          <Header />

          <div className="p-6 lg:p-8 ">
            {currentUser ? (
              <SettingsForm
                initialName={currentUser.name ?? ""}
                initialEmail={currentUser.email}
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
