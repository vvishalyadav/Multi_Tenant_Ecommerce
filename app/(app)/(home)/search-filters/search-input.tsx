import { Input } from "@/app/(app)/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button";

interface props{
    disabled?:boolean
};

export const SearchInput = ({disabled}:props)=>{
    return (
        <div className="w-full">
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500"/>
                <Input className="pl-8" placeholder="Search Products" disabled={disabled}/>
            </div>
            {/* <Button className={"size-12 shrink-0 flex lg:hidden"}>
                <ListFilterIcon/>
            </Button> */}
        </div>
    )
}