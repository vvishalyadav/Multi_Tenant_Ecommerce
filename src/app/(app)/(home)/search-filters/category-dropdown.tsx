import { Categories } from "@/src/collections/Categories";
import Link from "next/link"
import { Category } from "@/payload-types";
import { Button } from "../../components/ui/button";

interface Props{
    category:Category,
    isOpen?:boolean,
    isNavigationHovered?:boolean
}

export const CategoryDropdown = ({
    category,
    isOpen,
    isNavigationHovered
}:Props)=>{
    return (
        <div>
            <Button variant={"elevated"}>
                <Link href={category.slug}>{category.name}</Link>
            </Button>
            <div></div>
            <div className="w-200 z-100">
                {category.subcategories?.map((subcategory:Category)=>(
                    // <div key={category.id} className="w-full hover:text-white hover:bg-black">
                        <Link href={subcategory.slug}>{subcategory.name}</Link>
                    // </div>
                ))}
                
            </div>
        </div>
    )
}