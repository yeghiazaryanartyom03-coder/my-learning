import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(request: Request){
  try{
    const body = await request.json()
     
    const {email, password, name} = body;

    if(!email || !password) {
      return NextResponse.json(
        {message: "Emile and password are required"},
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if(existingUser){
      return NextResponse.json(
        {message:"user already exist"},
        {status:200}
      )
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user =  await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword
      },
      select: {
        id: true,
        email: true,
        name: true,
        created: true,
      }
        
    }) 

    return NextResponse.json(user, {status: 201})

  }catch(error){
    console.error(error)

    return NextResponse.json(
      {message: "User already exists"},
      { status: 200 }
    )
  }
}