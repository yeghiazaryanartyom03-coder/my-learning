import { apiError } from "@/lib/apiError";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {

  try {
    const body = await req.json();

    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return apiError("User not found", 404)
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser?.userId,
      },
      data: {
        name: body.name,
      },
      select:{
        id:true,
        name: true,
        email: true,
        created: true,
        updateAt: true,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("PATCH /api/settings/change-name error:", error);

    return apiError("Something went wrong", 500)
  }
}