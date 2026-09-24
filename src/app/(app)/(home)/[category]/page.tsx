import { DEFAULT_LIMIT } from "@/src/constants";
import { loadProductFilters } from "@/src/modules/products/search-params";
import { ProductFilters } from "@/src/modules/products/ui/components/product-filters";
import { ProductList, ProductListSkeleton } from "@/src/modules/products/ui/components/product-list";
import { ProductSort } from "@/src/modules/products/ui/components/product-sort";
import { ProductListView } from "@/src/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/src/trpc/server";
import {HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { SearchParams } from "nuqs";
import { Suspense } from "react";
    

    interface Props{
        params:Promise<{
            category:string;
        }>,
        searchParams:Promise<SearchParams>
    }


    const page = async ({params,searchParams}:Props) =>{
        const {category} =  await params;

        const filters = await loadProductFilters(searchParams);

        const queryClient = getQueryClient();

    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            ...filters,
            category,
            limit:DEFAULT_LIMIT
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        }
    ));

        return(
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductListView category={category}/>
            </HydrationBoundary>
        );
    }

    export default page;