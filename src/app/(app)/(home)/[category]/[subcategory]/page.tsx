
import { loadProductFilters } from "@/src/modules/products/search-params";
import { ProductListView } from "@/src/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/src/trpc/server";
import {HydrationBoundary, dehydrate} from "@tanstack/react-query"
import { SearchParams } from "nuqs/server";


interface Props{
    params : Promise<{
        subcategory:string; 
    }>,
    searchParams :Promise<SearchParams>;
}

const Page = async ({params, searchParams}:Props)=>{

    const {subcategory} = await params;

    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
         category:subcategory,
        ...filters, 
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={subcategory}/>
        </HydrationBoundary>
    );

};

export default Page;