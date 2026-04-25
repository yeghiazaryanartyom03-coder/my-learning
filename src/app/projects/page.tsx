import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { prisma } from "@/lib/prisma";
import { ProjectsSection } from "@/components/ProjectsSection";



export default async function ProjectsPage() {
  
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1">
          <Header />

          <div className="p-6 lg:p-8">

            <ProjectsSection projects={projects}/>

            
          </div>
        </section>
      </div>
    </main>
  );
}