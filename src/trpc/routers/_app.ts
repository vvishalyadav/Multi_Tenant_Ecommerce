import {z} from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { categoriesRouter } from '@/src/modules/categories/server/procedures';
import {authRouter} from '@/src/modules/auth/server/procedures'


export const appRouter = createTRPCRouter({
    auth: authRouter,
    categories: categoriesRouter    
});

export type AppRouter = typeof appRouter;   