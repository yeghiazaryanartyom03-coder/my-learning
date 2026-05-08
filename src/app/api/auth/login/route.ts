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
      return apiError("Email and password are required",400)
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if(!user || !user.password) {
      return apiError("invalid credentials",401)
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    if(!isPasswordCorrect){
      return apiError("invalid credentials",401)
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      {
        userId: user.id,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      }
    )

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
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path:"/",
      maxAge: 60*15,
    })

    response.cookies.set("refreshToken",refreshToken,{
      httpOnly:true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 *7
    })

    return response
  }catch(error){
    console.error(error)

    return apiError("Faild to login", 500)
  }
  
}