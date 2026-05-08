import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { getCurrentUser } from "@/lib/getCurrentUser";
import { apiError } from "@/lib/apiError";

export async function PATCH(request: Request) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return apiError("Unauthoraized", 401)
        }

        const body = await request.json()

        const { currentPassword, newPassword } = body

        if (!currentPassword || !newPassword) {
            return apiError("Current password and new password are required",400)
        }

        if (newPassword.length < 8) {
            return apiError("New password must be at least 8 characters",400)
        }

        if (newPassword === currentPassword) {
            return apiError("New password must be different from current password", 400)
        }

        const dbUser = await prisma.user.findUnique({
            where: {
                id: currentUser.userId
            }
        })

        if (!dbUser) {
            return apiError("User not Found", 404)
        }

        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            dbUser.password
        )

        if (!isPasswordCorrect) {
            return apiError("Current password is incorrect", 400)
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser?.userId
            },
            data: {
                password: hashedPassword
            },
            select: {
                id: true,
                email: true,
                name: true,
                created: true,
                updateAt: true,
            }
        })

        return NextResponse.json(updatedUser, { status: 200 })

    } catch (error) {
        console.log(error)
        return apiError("Something went wrong", 500)
    }
}