import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { apiError } from "@/lib/apiError"

export async function POST(request:Request){
  try{
    const body = await request.json()

    const { email, password } = body

    if(!email || !password){
      return NextResponse.json(
        apiError("Email and password are required",400),
        {status: 400}
      )
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if(!user || !user.password) {
      return NextResponse.json(
        apiError("invalid credentials",401),
        {status: 401}
      )
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    if(!isPasswordCorrect){
      return NextResponse.json(
        apiError("invalid credentials",401),
        {status: 401}
      )
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    const response =  NextResponse.json(
      {
        message: "login successful",
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
      },
      {status: 200}
    );

    response.cookies.set("accessToken",accessToken,{
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path:"/",
    })

    return response
  }catch(error){
    console.error(error)

    return NextResponse.json(
      apiError("Faild to login", 500),
      {status:500}

    )
  }
  
}