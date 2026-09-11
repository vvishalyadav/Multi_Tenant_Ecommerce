import { z } from "zod";
import {toast} from 'sonner'
import { useTRPC } from "@/src/trpc/client";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import {useMutation} from '@tanstack/react-query'
import {Controller, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import 
{  
    Field,
    FieldDescription,
    FieldError,
    FieldLabel
} from '@/src/app/(app)/components/ui/field'
import { registerSchema } from '../../../schemas';
import Link from "next/link";
import { cn } from "@/src/app/(app)/lib/utils";
import { Button } from "@/src/app/(app)/components/ui/button";
import { Input } from "@/src/app/(app)/components/ui/input";

const poppins = Poppins({
    subsets:["latin"],
    weight:["700"]
});

export const signUpView = () => {
    const router = useRouter();

    const trpc = useTRPC();
    
    const register = useMutation(trpc.auth.register.mutationOptions({
        onError:(error)=>{
            toast.error(error.message);
        },
        onSuccess:()=>{
            router.push('/');
        },
    }));

    const form = useForm<z.infer<typeof registerSchema>>({
        mode:"all",
        resolver:zodResolver(registerSchema),
        defaultValues:{
            email:"",
            password:"",
            username:"",
        },
    });

    const onSubmit = (values:z.infer<typeof registerSchema>)=>{
        register.mutate(values);
    }

    const username = form.watch("username");

    const usernameErrors = form.formState.errors.username;

    const showPreview = username && !usernameErrors;

    return(
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
                <form 
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-8 p-4 lg:p-16"
                  >
                    <div className="flex items-center justify-between mb-8">
                        <Link href={"/"}>
                            <span className={cn("text-2xl font-semibold",poppins.className)}>funroad</span>
                        </Link>
                        <Button 
                        variant={"ghost"}
                        size={"sm"}
                        className={"text-base border-none underline"}
                        >
                            <Link prefetch href={"/sign-in"}>
                            Sign in
                            </Link>
                        </Button>
                    </div>
                    <h1 className="text-4xl font-medium">
                        Join over 1,580 creaters earning money on funroad.
                    </h1>
                    <Controller 
                    name="username" 
                    render={({field})=>(
                        <Field>
                            <FieldLabel className="text-base">username</FieldLabel>
                            <Input {...field}/>
                            <FieldDescription
                            className={cn("hidden",showPreview && "block")}
                            >
                                Your Store Will Be Available At&nbsp;
                                <strong>{username}</strong>.shop.com
                            </FieldDescription>
                            <FieldError/>      
                        </Field>
                    )}
                    />
                    <Controller 
                    name="email" 
                    render={({field})=>(
                        <Field>
                            <FieldLabel className="text-base">Email</FieldLabel>
                            <Input {...field}/>
                            <FieldError/>
                        </Field>
                    )}/>

                    <Controller name="password" render={({field})=>(
                        <Field>
                            <FieldLabel className="text-base">Password</FieldLabel>
                            <Input {...field} type="password"/>
                            <FieldError/>
                        </Field>
                    )}/>

                    <Button
                    disabled={register.isPending}
                    type="submit"
                    size={"lg"}
                    variant={"elevated"}
                    className={"bg-black text-white hover:bg-pink-400 hover:text-primary"}
                    >
                        Create Account
                    </Button>
                </form>
            </div>
            <div
             className="h-screen w-full lg:col-span-2 hidden lg:block"
             style={{
                backgroundImage:"url('/auth-bg.png')",
                backgroundSize:"cover",
                backgroundPosition:"center",
             }}
            />
        </div>
    )



}


