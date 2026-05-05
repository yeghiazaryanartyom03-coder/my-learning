import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { getCurrentUser } from "@/lib/getCurrentUser";
import { apiError } from "@/lib/apiError";

export async function PATCH(request: Request) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.json(
                apiError("Unauthoraized", 401),
                {status: 401}
            )
        }

        const body = await request.json()

        const { currentPassword, newPassword } = body

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                apiError("Current password and new password are required",400),
                {status: 400}
            )
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                apiError("New password must be at least 8 characters",400),
                {status: 400}
            );
        }

        if (newPassword === currentPassword) {
            return NextResponse.json(
                apiError("New password must be different from current password", 400),
                {status: 400}
            );
        }

        const dbUser = await prisma.user.findUnique({
            where: {
                id: currentUser.userId
            }
        })

        if (!dbUser) {
            return NextResponse.json(
                apiError("User not Found", 404),
                {status: 404}
            )
        }

        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            dbUser.password
        )

        if (!isPasswordCorrect) {
            return NextResponse.json(
                apiError("Current password is incorrect", 400),
                {status: 400}
            );
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
        return NextResponse.json(
            apiError("Something went wrong", 500),
            {status: 500}
        )
    }
}