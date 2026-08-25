import { nav } from "framer-motion/client"
import React from "react";
import Navbar from "./Navbar";
import configPromise from '@payload-config'
import { getPayload } from "payload";
import { SearchFilter } from "./search-filters";


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
    where:{
      parent:{
        exists:false
      }
    }
  })

  return(
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <SearchFilter data={data}/>
      {children}
    </div>
  )
}
export default Layout;