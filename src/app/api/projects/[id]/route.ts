import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { apiError } from "@/lib/apiError";

interface Params {
  params: Promise<{
    id:string;
  }>;
}

export async function PATCH(request:Request,{params}: Params){
  try{
    const {id} = await params

    const user = await getCurrentUser()

    if (!user) {
      return apiError("Unauthorized",401)
    }

    const body = await request.json()

    const {title, description, status, progress, dueDate} = body

    const existingProject = await prisma.project.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    if (!existingProject) {
      return apiError("Project not found",404)
    }

    const updatedProject = await prisma.project.update({
      where:{
        id
      },
      data:{
        title,
        description: description || null,
        status,
        progress: Number(progress),
        dueDate: dueDate ? new Date(dueDate) : null
      }
    })

    return NextResponse.json(updatedProject,{ status: 200 });
  }catch(error){
    console.error(error)
    
    return apiError("Failed to update project",500)
  }
}

export async function DELETE(_:Request,{params}:Params){
  try{
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return apiError("Unauthorized", 401)
    }

    const {id} = await params;

    const existingProject = await prisma.project.findFirst({
      where: {
        id,
        userId: currentUser.userId,
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    await prisma.project.delete({
      where:{
        id,
      }
    })

    return NextResponse.json({message: "Project deleted"}, {status: 200});
  }catch(error){
    console.error("DELETE PROJECT ERROR:",error)

    return apiError("Failed to delete project", 500)
  }
}

