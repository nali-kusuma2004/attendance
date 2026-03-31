import React from 'react'
import Cards from "./cards.jsx"
import Liveattendance from "./liveattendance.jsx"
import Quick from "./quick.jsx"
import {useEffect,useState} from "react";

export default function Mainblock() {
    const [stats, setStats] =useState({
  totalStaff: 0,
  totalStudents: 0,
  present: 0,
  absent: 0,
  attendance: 0,
  lateEntries: 0,
  onLeave: 0,
  scans: 0,
  deviceStatus: "Offline",
  fingerprintQuality: 0,
  failedScans: 0,
});

useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/dashboarddata", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

      });

    //   console.log(localStorage.getItem("token"));
      const data = await res.json();
      setStats(data.data);
      console.log(data);

    } catch (err) {
      console.error(err);
    }
  };

  fetchStats();
}, []);

    const cards=[
        {name:"Total Staff",content:stats.totalStaff ,url:"/staff"},
        {name:"Total Students",content:stats.totalStudents,url:"/students"},
        {name:"Today Present",content:stats.present,url:"/present"}, 
        {name:"Absent",content:stats.absent,url:"/absent"},
        {name:"Attendance",content:stats.attendance,url:""},
        {name:"Late Entries",content:stats.lateEntries,url:""},
        {name:"On leave",content:stats.onLeave,url:""},
        {name:"Biometrics Scans ",content:stats.scans,url:""},
        {name:"Device Status",content:stats.deviceStatus,url:""},
        {name:"finger print Quality",content:stats.fingerprintQuality+"%",url:""},
        {name:"Failed Scans",content:stats.failedScans,url:""}
    ]


  return (
        <section className={`  bg-gray-100`} >
           <div></div>   
            {/* cards */}
            <div className="flex flex-wrap pb-4">
            {cards.map((item,index)=>(
                <Cards key={index} name={item.name} value={item.content} url={item.url}/>
            ))}
            </div>
             {/* live attendance */} <Liveattendance />
             {/* quick action */} <Quick />
        </section>
  )
}
