import { ProductView } from "@/src/modules/products/ui/views/product-view";
import { getQueryClient, trpc } from "@/src/trpc/server";
import {HydrationBoundary,dehydrate} from "@tanstack/react-query"

interface Props{
    params: Promise<{productId:string, slug:string}>;
};

const Page = async ({params}:Props)=>{
    const {productId,slug} = await params;

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({
        slug,
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductView productId={productId} tenantSlug={slug}/>
        </HydrationBoundary>
    );
}

export default Page