import { useRouter } from "next/navigation";
import { CustomCategory } from "../../../../../app/(app)/(home)/types";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../../../../app/(app)/components/ui/sheet";
import { ScrollArea } from "../../../../../app/(app)/components/ui/scroll-area";
import { Button } from "../../../../../app/(app)/components/ui/button";
import { ChevronLeftIcon, ChevronsRightIcon } from "lucide-react";
import { useTRPC } from "@/src/trpc/client";
import {useQuery} from "@tanstack/react-query"
import { CategoriesGetManyOutput } from "@/src/modules/types";

interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
};

export const CategoriesSidebar = ({
    open,
    onOpenChange,
}:Props)=>{
    
    const trpc = useTRPC();
    const {data} = useQuery(trpc.categories.getMany.queryOptions());


    const router = useRouter();

    const [parentCategories,setParentCategories] = useState<CategoriesGetManyOutput|null>(null)
    const [selectedCategory,setSelectedCategory] = useState<CategoriesGetManyOutput[1]|null>(null)

    const currentCategories = parentCategories ?? data ?? [];

    const handleOpenChange = (open:boolean)=>{
        setSelectedCategory(null);
        setParentCategories(null);
        onOpenChange(open);
    };

    const handleCategoryClick = (Category:CategoriesGetManyOutput[1])=>{
        if(Category.subcategories && Category.subcategories.length>0){
            setParentCategories(Category.subcategories as CategoriesGetManyOutput);
            setSelectedCategory(Category);
        }else{

            if(parentCategories && selectedCategory){
                router.push(`/${selectedCategory.slug}/${Category.slug}`)
            }else{
                if(Category.slug==='all'){
                    router.push('/');
                }else{
                    router.push(`/${Category.slug}`);
                }
            }

            handleOpenChange(false);
        }
    }

    const handleBackClick = ()=>{
        if(parentCategories){
            setParentCategories(null);
            setSelectedCategory(null);
        }
    }

    const backgroundColor = selectedCategory?.color || "white"; 

    return(
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent side="left"
            className={"p-0 transition-none"}
            style={{backgroundColor}}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>Categories</SheetTitle>
                </SheetHeader>
                <ScrollArea className={"flex flex-col overflow-y-auto h-full pb-2"}>
                    {
                        parentCategories && (
                            <button
                            onClick={handleBackClick}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex 
                            justify-between items-center text-base font-medium cursor-pointer"
                            >
                                <ChevronLeftIcon className="size-4 mr-2"/>
                                Back
                            </button>
                        )}
                    {currentCategories.map((category)=>(
                        <button
                         key={category.slug}
                         onClick={()=>handleCategoryClick(category)}
                         className="w-full text-left p-4 hover:bg-black hover:text-white justify-between
                          items-center text-base font-medium cursor-pointer"
                        >
                            {category.name}
                            {category.subcategories && category.subcategories.length>0 && (
                                <ChevronsRightIcon className="size-4"/>
                            ) }
                        </button>
                    ))}

                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}