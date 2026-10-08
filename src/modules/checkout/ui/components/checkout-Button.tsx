import { Button } from "@/src/app/(app)/components/ui/button";
import { useCart } from "../../hooks/use-cart";
import { cn, generateTenantURL } from "@/src/lib/utils";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";


interface CheckoutButtonProps{
    classname?:string; 
    hideIfEmpty?:boolean;
    tenantSlug:string
}

export const CheckoutButton = ({
    classname,
    hideIfEmpty,
    tenantSlug
}:CheckoutButtonProps)=>{
    const {totalItems} = useCart(tenantSlug);
    
    if(hideIfEmpty && totalItems ===0) return null;

    return(
        <Button variant={"elevated"} className={cn("bg-white",classname)}>
            <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
                <ShoppingCartIcon/>{totalItems>0?totalItems:""}
            </Link>
        </Button>

    );
}