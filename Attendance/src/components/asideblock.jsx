import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdOutlineAccessTime,
  MdFingerprint,
  MdRequestPage,
  MdAddBox,
} from "react-icons/md";
import { useState,useEffect } from "react";

export default function Asideblock({isopen}) {
  // const [isopen, setisopen]=useState(false);
  // const [selecteditem, setselecteditem]=useState("");
  const Navigate=useNavigate();
  if(!isopen) return null ;

  const items = [
    { name: "Main Dashboard", icon: <MdDashboard size="28" color="blue" /> , path:"/dashboard"},
    { name: "Staff", icon: <MdPeople size="28" color="violet" /> ,path:"/staff"},
    {
      name: "Attendance",
      icon: <MdOutlineAccessTime size="28" color="cyan" />,
    },
    { name: "Biometrics", icon: <MdFingerprint size="28" color="orange" /> },
    { name: "Request", icon: <MdRequestPage size="28" color="yellow" /> },
    { name: "Additional", icon: <MdAddBox size="28" color="red" /> },
  ];

  
  return (
    <>
    {isopen  &&  <>
      <section className={`${isopen} ? "w-1/6" :"w-0" `} >
        <div className="bg-linear-to-b from-black to-violet-800 pt-10 pb-45">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXaGW6CNj0_gGNGeDqPfxRAthVW8HOLWR4hg&s" className="pl-15 w-50 pb-10  bg-transparent "></img>
          {items.map((item, index) => (
              <button
              key={index}
              className=" flex items-center px-6 py-6 w-full text-white hover:bg-amber-300 hover:text-black"
              style={{ borderBottom: "2px solid white" }}
              onClick={()=>{Navigate(item.path)}}
              >
              <span className="pr-5">{item.icon}</span>
              <span className="text-l font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </section> 
      </>
}
    </>
  );
}
