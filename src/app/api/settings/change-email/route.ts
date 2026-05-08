import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma"
import { apiError } from "@/lib/apiError";

export async function PATCH(request: Request) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return apiError("Unauthorized",401)
        }

        const body = await request.json()

        const {currentPassword, newEmail} = body

        if (!newEmail || !currentPassword) {
            return apiError("New email and current password are required", 400)
        }

        const user = await prisma.user.findUnique({
            where: {
                id: currentUser.userId
            }
        })

        if (!user) {
            return apiError("user not found", 404)
        }

        if (user.email === newEmail) {
            return apiError("New email must be different from current", 400)
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: newEmail,
            },
        });

        if (existingUser) {
            return apiError("This email is already taken", 409)
        }

        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            user.password,
        )

        if (!isPasswordCorrect) {
            return apiError("password is incorrect", 400 )
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.userId
            },
            data: {
                email: newEmail
            },
            select: {
                id: true,
                name: true,
                email: true,
                created: true,
                updateAt: true,
            }
        })

        const newAccessToken = jwt.sign(
            {
                userId: currentUser.userId,
                email: updatedUser.email
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "7d"
            }
        )

        const response = NextResponse.json(
            {
                message: "Email changed successfully",
                user: updatedUser,
            },
            { status: 200 }
        )

        response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/"
        })

        return response
    } catch (error) {
        console.error("CHANGE EMAIL ERROR:", error);

        return apiError("Failed to update email",500)
    }

}