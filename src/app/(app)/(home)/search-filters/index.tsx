import { h6 } from "framer-motion/client"
import { cn } from "../../lib/utils"
import { SearchIcon } from "lucide-react"
import { SearchInput } from "./search-input"
import { Categories } from "./categories"
import { CustomCategory } from "../types"


interface props{
    data:CustomCategory[]
}

export const SearchFilter = ({data}:props)=>{


return(
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
        <SearchInput data={data}/>
        <div className="hidden lg:block">
            <Categories data={data}/>
        </div>
    </div>
)

}