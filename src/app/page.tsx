import { DashboardCards } from "@/components/DashboardCards";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { prisma } from "@/lib/prisma";

// interface user{
//   id: string;
//   emile: string;
//   name: string | null;
//   created: Date;
//   updateAt: Date;
// }

export default async function HomePage() {

  await prisma.user.create({
    data: {
      email: "bomj@gmail.com",
      name: "Artyom",
    }
  }
  )

  const users = await prisma.user.findMany()

  users.map((user)=>{
    console.log(user)
  })

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <Sidebar />
        <section className="flex-1">
          <Header />
          <div className="p-6">
            <DashboardCards />

          </div>
        </section >
      </div >
    </main >
  );
}