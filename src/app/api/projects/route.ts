import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET(){
  try{
    const currentUser = await getCurrentUser()

    if(!currentUser){
      return NextResponse.json(
        {message: "Unauthorized"},
        {status:401}
      )
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: currentUser?.userId
      },
    orderBy:{
      createdAt: "desc",
    },
  });

  return NextResponse.json(projects)
  }catch(error){
    console.error(error)

    return NextResponse.json(
      {message: "Something went wrong"},
      {status: 500}

    )
  }
  
}

export async function POST(req: Request){
  try{
    const body = await req.json()
    
    const currentUser = await getCurrentUser()

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
            id: currentUser.userId
          }
        } ,
        title: body.title,
        description: body.description,
        status: body.status,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
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