import { DashboardCards } from "@/components/DashboardCards";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { prisma } from "@/lib/prisma";
import { AddUserForm } from "@/components/AddUserForm";

// interface user{
//   id: string;
//   emile: string;
//   name: string | null;
//   created: Date;
//   updateAt: Date;
// }

export default async function HomePage() {
  // await prisma.user.create({
  //   data: {
  //     email: "karen@gmail.com",
  //     name: "karen",
  //   }
  // }
  // )

  const users = await prisma.user.findMany();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <Sidebar />
        <section className="flex-1">
          <Header />
          <div className="p-6">
            <DashboardCards />
            <AddUserForm />
            <div className="mt-8">
              <h1 className="text-2xl font-bold mb-4">Users</h1>

              {users.map((user) => (
                <div key={user.id} className="mb-3 rounded-xl bg-slate-800 p-4">
                  <p className="font-semibold">{user.name ?? "No name"}</p>

                  <p className="text-sm text-slate-400">{user.email}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
