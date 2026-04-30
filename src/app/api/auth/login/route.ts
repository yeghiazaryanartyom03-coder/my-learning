import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(request:Request){
  try{
    const body = await request.json()

    console.log("LOGIN BODY:", body);

    const { email, password } = body

    console.log(email, password)

    if(!email || !password){
      return NextResponse.json(
        {message: "Email and password are required"},
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
        {message:"invalid credentials"},
        {status: 401}
      )
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    if(!isPasswordCorrect){
      return NextResponse.json(
        {message: "invalid credentials"},
        { status: 401 }
      )
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        emile: user.email
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
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
      {message: "Faild to login"},
      {status: 500}
    )
  }
  
}