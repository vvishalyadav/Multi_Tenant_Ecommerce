import { nav } from "framer-motion/client"
import React from "react";
import Navbar from "./Navbar";
import configPromise from '@payload-config'
import { getPayload } from "payload";
import { SearchFilter } from "./search-filters";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";
// import { CustomCategory } from "./types";

interface Props{
  children:React.ReactNode;
}

const Layout = async ({children}:Props)=>{

  const payload = await getPayload({
    config:configPromise
  })

  const data = await payload.find({
    collection:'categories',
    depth:1,
    pagination:false,
    sort:"name",
    where:{
      parent:{
        exists:false
      }
    }
  });

  const formattedData:CustomCategory[] = data.docs.map((doc)=>({
    ...doc,
    subcategories:(doc.subcategories?.docs??
    []).map((doc)=>({
      ...(doc as Category),
      subcategories:undefined,
    }))
  }))


  

  return(
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <SearchFilter data={formattedData}/>
      {children}
      {/* <br/><br/>
      <div>data:{JSON.stringify(data,null,2)}<br/><br/></div>
      <div>Formatted Data: {JSON.stringify(formattedData,null,2)}</div> */}
    </div>
  )
}
export default Layout;