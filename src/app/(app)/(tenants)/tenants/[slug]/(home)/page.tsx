import { DEFAULT_LIMIT } from "@/src/constants";
import { loadProductFilters } from "@/src/modules/products/search-params";
import { getQueryClient, trpc } from "@/src/trpc/server";
import { SearchParams } from "nuqs";
import {HydrationBoundary,dehydrate} from "@tanstack/react-query"
import { ProductListView } from "@/src/modules/products/ui/views/product-list-view";

interface Props{
    searchParams:Promise<SearchParams>;
    params:Promise<{slug:string}>;
};

const Page = async ({params,searchParams}:Props)=>{
    const {slug} = await params;
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();

    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        tenantSlug:slug,
        limit:DEFAULT_LIMIT,
    },
    {
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,

    }
));

    return( 
     <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductListView/>
     </HydrationBoundary>   
    );
}

export default Page;