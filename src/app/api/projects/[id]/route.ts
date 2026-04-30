import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";

interface Params {
  params: Promise<{
    id:string;
  }>;
}

export async function PATCH(request:Request,{params}: Params){
  try{
    const {id} = await params

    const user = await getCurrentUser()

    const body = await request.json()

    const {title, description, status, progress, dueDate} = body

    const updatedProject = await prisma.project.update({
      where:{
        id,
        userId: user?.userId
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
    
    return NextResponse.json(
      {
        message: "Failed to update project",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );

  }
}

export async function DELETE(_:Request,{params}:Params){
  try{
    const {id} = await params;

    await prisma.project.delete({
      where:{
        id,
      }
    })

    return NextResponse.json({message: "Project deleted"}, {status: 200});
  }catch(error){
    console.error("DELETE PROJECT ERROR:",error)

    return NextResponse.json(
      {message:"Failed to delete project"},
      {status: 500}
    )
  }
}

