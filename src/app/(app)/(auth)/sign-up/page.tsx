// import { SignUpView } from "@/src/modules/auth/ui/views/sign-up-view";
import { SignUpView } from "@/src/modules/auth/server/ui/views/sign-up-view";
import { caller } from "@/src/trpc/server";
import { redirect } from "next/navigation";

const Page = async () => {

  const session = await caller.auth.session();

  if(session.user){
    redirect("/");
  }

  return <SignUpView />
}
 
export default Page;