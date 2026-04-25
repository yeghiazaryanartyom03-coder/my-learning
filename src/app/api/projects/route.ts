import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(){
  const projects = prisma.project.findMany({
    orderBy:{
      createdAt: "desc",
    },
  });

  return NextResponse.json(projects)
}

export async function POST(req: Request){
  try{
    const body = await req.json()
    
    const currentUser = await prisma.user.findFirst()

    if(!currentUser){
      return NextResponse.json(
        {error: "User not found"},
        {status: 404},
      )
    }

    const project = await prisma.project.create({
      data: {
        user:{
          connect: {
            id: currentUser.id
          }
        } ,
        title: body.title,
        description: body.description,
        status: body.status,
        progress: Number(body.progress),
      }
    })

    return NextResponse.json(project)
  }catch(error){
    console.error("POST /api/projects error:", error);

    return NextResponse.json(
      {error: "Something went wrong"},
      {status: 500}
    );
  }
}