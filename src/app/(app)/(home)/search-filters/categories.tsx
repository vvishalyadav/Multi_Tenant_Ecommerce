import { Category } from "@/payload-types"
import { Button } from "../../components/ui/button"
import Link from "next/link"
import { CategoryDropdown } from "./category-dropdown"
import { CustomCategory } from "../types"


interface Props{
    data:any
}

export const Categories = ({
    data
}:Props) =>{
    return(
        <div className="relative w-full">
            <div className="flex flex-nowrap items-center">
                
                {data.map((category:CustomCategory)=>
                    <div key={category.id}>        
                        <CategoryDropdown 
                        category={category} 
                        isActive={false} 
                        isNavigationHovered = {false}
                        />
                    </div>  
                )}
            </div>
        </div>
    );
};