import { cookies } from "next/headers";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    return decoded;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return null;
    }

    console.error("Invalid access token:", error);
    return null;
  }
}