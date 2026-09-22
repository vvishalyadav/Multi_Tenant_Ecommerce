import {z} from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { categoriesRouter } from '@/src/modules/categories/server/procedures';
import {authRouter} from '@/src/modules/auth/server/procedures'
import { productsRouter } from '@/src/modules/products/server/procedures';
import { tagsRouter } from '@/src/modules/tags/server/procedures';


export const appRouter = createTRPCRouter({
    auth: authRouter,
    categories: categoriesRouter,    
    products:productsRouter,
    tags: tagsRouter
});

export type AppRouter = typeof appRouter;   