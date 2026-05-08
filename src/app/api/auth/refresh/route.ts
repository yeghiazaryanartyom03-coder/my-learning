import { NextResponse, NextRequest } from "next/server";
import jwt, { type JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { apiError } from "@/lib/apiError";

interface RefreshTokenPayload extends JwtPayload {
    userId: string,
}

export async function handleRefresh(request: NextRequest) {

    const cookieStore = await cookies()

    const refreshToken = cookieStore.get("refreshToken")?.value

    const redirectToParam = request.nextUrl.searchParams.get("redirectTo")

    const redirectTo = redirectToParam && redirectToParam.startsWith("/")
        ? redirectToParam
        : "/"

    if (!refreshToken) {
            return apiError("User not found", 404)
    }
    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!
        ) as RefreshTokenPayload

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            },
            select: {
                id: true,
                email: true,
                name: true,
            }
        })

        if (!user) {
            return apiError("User not found!", 404)
        }

        const newAccessToken = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "15m"
            }
        )

        const response = redirectToParam
            ? NextResponse.redirect(new URL(redirectTo, request.url))
            : NextResponse.json({
                message: "Access token refreshed",
            });


        response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 15,
        })

        return response
    } catch (error) {
        console.error(error)

        const response = redirectToParam
            ? NextResponse.redirect(new URL("/login", request.url))
            : apiError("Invalid refresh token", 401);

        response.cookies.set("accessToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0,
        });

        response.cookies.set("refreshToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0,
        });

        return response
    }
}

export async function GET(request: NextRequest) {
  return handleRefresh(request);
}

export async function POST(request: NextRequest) {
  return handleRefresh(request);
}