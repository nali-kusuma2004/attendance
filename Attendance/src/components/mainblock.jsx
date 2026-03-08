import React from 'react'
import Cards from "./cards.jsx"
import Liveattendance from "./liveattendance.jsx"
import Quick from "./quick.jsx"

export default function Mainblock() {
    const cards=[
        {name:"Total Staff",content:"" ,url:"/staff"},
        {name:"Total Students",content:"",url:"/students"},
        {name:"Today Present",content:"",url:"/present"}, 
        {name:"Absent",content:"",url:"/absent"},
        {name:"Attendance",content:"",url:"/attendance"},
        {name:"Late Entries",content:"",url:"/late entries"},
        {name:"On leave",content:"",url:"/on leave"},
        {name:"Biometrics Scans ",content:"",url:""},
        {name:"Device Status",content:"",url:""},
        {name:"finger print Quality",content:"",url:""},
        {name:"Failed Scans",content:"",url:""}
    ]
  return (
        <section className={`  bg-gray-100`} >
           <div></div>   
            {/* cards */}
            <div className="flex flex-wrap pb-4">
            {cards.map((item)=>(
                <Cards  name={item.name} value={item.content} url={item.url}/>
            ))}
            </div>
             {/* live attendance */} <Liveattendance />
             {/* quick action */} <Quick />
        </section>
  )
}
