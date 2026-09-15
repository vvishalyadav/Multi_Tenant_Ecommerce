"use client"

import { h6, param } from "framer-motion/client"
import { cn } from "../../../../../app/(app)/lib/utils"
import { SearchIcon } from "lucide-react"
import { SearchInput } from "./search-input"
import { Categories } from "./categories"
import { CustomCategory } from "../../../../../app/(app)/(home)/types"
import { useTRPC } from "@/src/trpc/client"
import {useSuspenseQuery} from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { DEFAULT_BG_COLOR } from "../../../constants"
import { BreadcrumbNavigation } from "./breadcrumb-navigation"

// interface props{
//     data:CustomCategory[]
// }

export const SearchFilter = ()=>{

    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.categories.getMany.queryOptions());

    const params = useParams();
    const categoryParam = params.category as string | undefined;
    const activeCategory = categoryParam || "all";

    const activeCategoryData = data.find((category)=>category.slug===activeCategory);

    const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
    const activeCategoryName = activeCategoryData?.name || null;

    const activeSubcategory = params.subcategory as string | undefined;
    const activeSubcategoryName = 
        activeCategoryData?.subcategories?.find(
            (subcategory)=> subcategory.slug === activeSubcategory
    )?.name || null;


return(
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{backgroundColor:activeCategoryColor}}>
        <SearchInput/>
        <div className="hidden lg:block">
            <Categories data={data}/>
        </div>
        <BreadcrumbNavigation
            activeCategory={activeCategory}
            activeCategoryName={activeCategoryName}
            activeSubcategoryName={activeSubcategoryName}
        />
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