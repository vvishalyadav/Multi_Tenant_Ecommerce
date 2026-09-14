import { SignInView } from "@/src/modules/auth/server/ui/views/sign-in-view"
import { caller } from "@/src/trpc/server"
import { redirect } from "next/navigation";

const Page = async ()=>{
    const session = await caller.auth.session();

    if(session.user){
        redirect("/");
    }

    return <SignInView/>
}

export default Page