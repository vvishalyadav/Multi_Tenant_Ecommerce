import { Suspense } from "react";
import {dehydrate ,HydrationBoundary, QueryClient} from "@tanstack/react-query";

import {getQueryClient,trpc} from "@/src/trpc/server";


import Navbar from "../../../modules/home/ui/components/Navbar";

import { SearchFilter, SearchFiltersSkeleton } from "../../../modules/home/ui/components/search-filters";





interface Props{
  children:React.ReactNode;
}

const Layout = async ({children}:Props)=>{

  // const payload = await getPayload({
  //   config:configPromise
  // })

  // const data = await payload.find({
  //   collection:'categories',
  //   depth:1,
  //   pagination:false, 
  //   where:{
  //     parent:{
  //       exists:false
  //     }
  //   },
  //   sort:"name"
  // });

  // const formattedData:CustomCategory[] = data.docs.map((doc)=>({
  //   ...doc,
  //   subcategories:(doc.subcategories?.docs??
  //   []).map((doc)=>({
  //     ...(doc as Category),
  //     subcategories:undefined,
  //   }))
  // }))

  const queryClient = getQueryClient();
   void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions(),
   );



  return(
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton/>}>
          <SearchFilter/>
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F0]">
        {children}
      </div>
      
      {/* <br/><br/>
      <div>data:{JSON.stringify(data,null,2)}<br/><br/></div>
      <div>Formatted Data: {JSON.stringify(formattedData,null,2)}</div> */}
    </div>
  )
}
export default Layout;