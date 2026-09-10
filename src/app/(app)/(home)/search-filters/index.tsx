"use client"

import { h6 } from "framer-motion/client"
import { cn } from "../../lib/utils"
import { SearchIcon } from "lucide-react"
import { SearchInput } from "./search-input"
import { Categories } from "./categories"
import { CustomCategory } from "../types"
import { useTRPC } from "@/src/trpc/client"
import {useSuspenseQuery} from "@tanstack/react-query"

// interface props{
//     data:CustomCategory[]
// }

export const SearchFilter = ()=>{

    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.categories.getMany.queryOptions());

return(
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{backgroundColor:"#f5f5f5"}}>
        <SearchInput/>
        <div className="hidden lg:block">
            <Categories data={data}/>
        </div>
    </div>
)

};

export const SearchFiltersSkeleton = () => {
    return(
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
        style={{backgroundColor:"#F5F5F5"}}
        >
            <SearchInput disabled/>
            <div className="hidden lg:block">
                <div className="h-11"></div>
            </div>
        </div>
    )
}