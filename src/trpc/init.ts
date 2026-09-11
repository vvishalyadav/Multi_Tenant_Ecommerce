import {initTRPC} from '@trpc/server'
import { getPayload } from 'payload';
import { cache } from 'react';
import superjson from 'superjson'
import config from '@payload-config'
import payloadConfig from '@/payload.config';

// export const createTRPCContext = async(opts:{headers:Headers})=>{
//     return {UserId:'user_123'};
// };

export const createTRPCContext = cache(async ()=>{
    return {userId : 'user123'};
});


const t = initTRPC.create({
    transformer:superjson,
});

// const t = initTRPC
//         .context<Awaited<ReturnType<typeof createTRPCContext>>>()
//         .create({
//             transformer:superjson,
//         });


export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(async ({next})=>{
    const payload = await getPayload({config});

    return next({ctx:{db:payload}});
});