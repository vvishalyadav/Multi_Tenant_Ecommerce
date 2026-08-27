import { Category } from "@/payload-types"
import { Button } from "../../components/ui/button"
import Link from "next/link"
import { CategoryDropdown } from "./category-dropdown"


interface Props{
    data:any
}

export const Categories = ({
    data
}:Props) =>{
    return(
        <div className="w-full">
            <div className="w-full flex gap-2">
                {data.map((category:Category)=>
                    <div key={category.id}>
                        <CategoryDropdown category={category}></CategoryDropdown>
                    </div>  
                )}
            </div>
        </div>
    )
}