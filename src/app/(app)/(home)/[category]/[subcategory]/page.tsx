import { ProductFilters } from "@/src/modules/products/ui/components/product-filters";
import { ProductList, ProductListSkeleton } from "@/src/modules/products/ui/components/product-list";
import { getQueryClient, trpc } from "@/src/trpc/server";
import {HydrationBoundary, dehydrate} from "@tanstack/react-query"
import { Suspense } from "react";

interface Props{
    params : Promise<{
        subcategory:string; 
    }>
}

const Page = async ({params}:Props)=>{

    const {subcategory} = await params;

    const queryClient = getQueryClient();
    queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
        category:subcategory,
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductListSkeleton/>}>
                <ProductList category={subcategory}/>
            </Suspense>
        </HydrationBoundary>
    );

};

export default Page;