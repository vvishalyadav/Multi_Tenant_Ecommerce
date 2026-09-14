"use client"
import {Poppins} from 'next/font/google';
import {useRouter} from 'next/navigation';
import { useTRPC } from '@/src/trpc/client';
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { toast } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { loginSchema } from '../../../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { cn } from '@/src/app/(app)/lib/utils';
import { Button } from '@/src/app/(app)/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/src/app/(app)/components/ui/field';
import { Input } from '@/src/app/(app)/components/ui/input';

const poppins = Poppins({
    subsets:["latin"],
    weight:["700"],
});

export const SignInView = () => {
    const router = useRouter();

    const trpc = useTRPC();

    const queryClient = useQueryClient();

    const login = useMutation(trpc.auth.login.mutationOptions({
        onError:(error)=>{
            toast.error(error.message);
        },
        onSuccess: async ()=>{
            await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
            router.push("/");
        },
    }));

    const form = useForm<z.infer<typeof loginSchema>>({
        mode:"all",
        resolver: zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password:""
        },
    });

    const onSubmit = (values:z.infer<typeof loginSchema>)=>{
        login.mutate(values);
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-5'>
            <div className='bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto'>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-8 p-4 lg:p-16'
                >
                    <div className='flex items-center justify-between mb-8'>
                        <Link href="/" >
                            <span className={cn("text-2xl font-semibold",poppins.className)}>
                                funroad
                            </span>
                        </Link>
                        <Button
                          className='text-base border-none underline'
                          size={'sm'} 
                          variant={'ghost'}>
                            <Link href="/sign-up">
                                Sign up
                            </Link>
                          </Button>
                    </div>
                          <h1 className='text-4xl font-medium'>
                            Welcome back to funroad
                          </h1>

                          <Controller 
                            name='email'
                            control={form.control}
                            render={({field})=>(
                                <Field>
                                    <FieldLabel className='text-base'>
                                        Email
                                    </FieldLabel>
                                    <Input {...field}/>
                                    <FieldError/>
                                </Field>
                            )}
                            />

                          <Controller
                           name='password'
                           control={form.control}
                           render={({field})=>(
                            <Field>
                                <FieldLabel className='text-base'>Password</FieldLabel>
                                <Input {...field} type='password'/>
                                <FieldError/>
                            </Field>
                           )}
                          />

                          <Button 
                          disabled={login.isPending}
                          className={'bg-black text-white hover:bg-pink-400 hover:text-primary'}
                          type='submit'
                          size={'lg'}
                          variant={'elevated'}
                          >
                            Log in
                          </Button>
                </form>
            </div>
            <div
                className='h-screen w-full lg:col-span-2 hidden lg:block'
                style={{
                    backgroundImage:"url('auth-bg.png')",
                    backgroundSize:"cover",
                    backgroundPosition:"center",
                }}
            />

        </div>
    )


}