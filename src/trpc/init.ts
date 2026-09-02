import {initTRPC} from '@trpc/server'
import superjson from 'superjson'

export const createTRPCContext = async(opts:{headers:Headers})=>{
    return {UserId:'user_123'};
};

const t = initTRPC
        .context<Awaited<ReturnType<typeof createTRPCContext>>>()
        .create({
            transformer:superjson,
        });


export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;