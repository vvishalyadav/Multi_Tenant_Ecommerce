import { DEFAULT_LIMIT } from "@/src/constants";
import { loadProductFilters } from "@/src/modules/products/search-params";
import { getQueryClient, trpc } from "@/src/trpc/server";
import { SearchParams } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductListView } from "@/src/modules/products/ui/views/product-list-view";


interface Props{
  searchParams: Promise<SearchParams>;
};

const Page =  async ({searchParams}:Props) =>{
   const filters = await loadProductFilters(searchParams);

   const queryClient = getQueryClient();

   void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
    {
      ...filters,
      limit:DEFAULT_LIMIT,
    },
    {
    
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    }
  ));

   return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <ProductListView/>
  </HydrationBoundary>
)

} 


export default Page;












// import Image from "next/image";
// import { Button } from "@/app/(app)/components/ui/button";
// import { Input } from "@/app/(app)/components/ui/input";
// import { Checkbox } from "@/app/(app)/components/ui/checkbox";
// import { Textarea } from "@/app/(app)/components/ui/textarea";
// import { Progress } from "@/app/(app)/components/ui/progress";

// import configPromise from '@payload-config'
// import { getPayload } from "payload";

// export default async function Home() {

  // const payload = await getPayload({
  //   config:configPromise
  // })

  // const data = await payload.find({
  //   collection:'categories',
  //   depth:1,
  //   where :{
  //     parent:{
  //       exists:false
  //     }
  //   }
  // });

  // console.log(data);

  // return (
  //   <div>
  //     Home Page
  //   </div>
    // <div className="flex flex-col gap-y-5 bg-zinc-50 h-full">

    //    <div>{JSON.stringify(data,null,2)}</div>


    //   <Button variant="elevated" className={'p-6 text-lg w-sm'}>I am a Button</Button>
    //   <Input placeholder="I am a input"  className="p-2  w-sm h-10 "/>
    //   <Progress value={50} className={'w-sm'}/>

    //   <Textarea className="w-sm "></Textarea>
    //   <Checkbox className={' size-5'}></Checkbox> 
    // </div>
//   );
// }


// import type { SearchParams } from "nuqs/server"
