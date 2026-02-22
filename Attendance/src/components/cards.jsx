import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom"
export default function Cards({name,value,url}) {
    const navigation=useNavigate();
  return (
    <>
        <div className="  m-3 w-80 pb-2 bg-cyan-800   rounded-xl " style={{ boxShadow:"1px 4px 4px black"}}>
            <p className=" flex pt-10 pl-10 pb-4 text-slate-200 text-xl font-light ">{name} <span className="pl-3 pr-3">:</span>{value}</p>
           <button className="cursor-pointer border-2 ml-60 pl-1 h-10 w-10 rounded-3xl text-red-800 shadow-current bg-white " onClick={()=>{navigation(url)}}><FaArrowRight size="25"/></button>
        </div>

    </>
  )
}
