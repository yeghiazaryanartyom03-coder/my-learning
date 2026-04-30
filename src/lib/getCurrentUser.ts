import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";

interface TokenPayload {
  email: string;
  userId: string;
}

export async function getCurrentUser(){
  try{
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value

    if(!token) return null;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!

    ) as TokenPayload

    return decoded

  }catch(error){
    console.error(error)
    return null
  }
}