import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id:string;
  }>;
}

export async function PATCH(request:Request,{params}: Params){
  try{
    const {id} = await params

    const body = await request.json()

    const {title, description, status, progress} = body

    const updatedProject = await prisma.project.update({
      where:{
        id,
      },
      data:{
        title,
        description,
        status,
        progress,
      }
    })

    return NextResponse.json(updatedProject,{ status: 200 });
  }catch(error){
    console.error(error)
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

