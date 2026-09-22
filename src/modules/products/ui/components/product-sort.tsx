"use client"
import { Button } from "@/src/app/(app)/components/ui/button";
import { useProductFilters } from "../../hooks/use-product-filters";
import { cn } from "@/src/app/(app)/lib/utils";


export const ProductSort = ()=>{
    const [filters,setFilters] = useProductFilters();
    
    return (
        <div>
            <Button
              size={"sm"}
              className={cn(
                "rounded-full bg-white hover:bg-white",
                filters.sort !=="curated" &&
                "bg-transparent border-transparent hover:border-border hover:bg-transparent"
            )}
            variant={"secondary"}
            onClick={()=>setFilters({sort:"curated"})}
            >
                Curated
            </Button>
            <Button
             size={"sm"}
             className={cn(
                "rounded-full bg-white hover:bg-white",
                filters.sort !== "trending" && 
                "bg-transparent border-transparent hover:border-border hover:bg-transparent"
            )}
             variant={"secondary"}
             onClick={()=>setFilters({sort:"curated"})}
            >
                Trending
            </Button>
            <Button 
               size={"sm"}
               className={cn(
                "rounded-full bg-white hover:bg-white",
                filters.sort !== "hot_and_new" &&
                 "bg-transparent border-transparent hover:border-border hover:bg-transparent"    
               )}
               variant="secondary"
               onClick={()=>setFilters({sort:"hot_and_new"})}
            >
                Hot & New    
            </Button>       
        </div>
    );
} 