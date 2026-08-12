import { nav } from "framer-motion/client"
import React from "react";
import Navbar from "./Navbar";

interface Props{
  children:React.ReactNode;
}

const Layout = ({children}:Props)=>{
  return(
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      {children}
    </div>
  )
}
export default Layout;