import Link from "next/link";

import { Category } from "@/payload-types";
import { cn } from "../../../../../app/(app)/lib/utils";
import { CustomCategory } from "../../../../../app/(app)/(home)/types";
import { CategoriesGetManyOutput } from "@/src/modules/types";


interface Props{
    category:CategoriesGetManyOutput[1],
    isOpen:boolean,
    position:{top:number,left:number}
}

export const SubcategoryMenu = ({
    category,
    isOpen,
    position
}:Props)=>{

    if(!isOpen || !category.subcategories || category.subcategories.length ===0){
        return null;
    }

    const backgroundColor = category.color || "#f5f5f5";


    return(
    <div className={cn("fixed z-100")}
    style={{
        top:position.top,
        left:position.left
    }}
    >

        {/* Invisible bride to maintain hover */}
        <div className="h-3 w-60"/>

        <div style={{backgroundColor}}
        className={cn("w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
            "-translate-x-[2px] -translate-y-[2px]"
        )}
        >
            <div>
                {category.subcategories?.map((subcategory:Category)=>(
                    <Link 
                    key={subcategory.slug} 
                    href={`/${category.slug}/${subcategory.slug}`}
                    className={cn("w-full text-left p-4 hover:bg-black hover:text-white justify-between",
                        "flex items-center font-medium underline")}
                    >{subcategory.name}</Link>
                ))}
            </div>
        </div>
    </div>
    )
}

