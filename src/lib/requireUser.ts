import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";

export async function requireUser(redirectTo:string){
    const user = await getCurrentUser()

    if(user){
        return user
    }

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value

    if(refreshToken){
        redirect(`/api/auth/refresh?redirectTo=${encodeURIComponent(redirectTo)}`)
    }

    redirect("/login")
}