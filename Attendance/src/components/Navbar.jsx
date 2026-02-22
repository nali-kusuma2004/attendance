import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import {useNavigate} from "react-router-dom";
import Asideblock from "./asideblock";
export default function Navbar({username}) {
    const navigate=useNavigate();
    const user= username || localStorage.getItem("username");
    console.log("Navbar user:", user);

  return (
    <>  

      <nav className=" flex h-40vh  text-white ">
        <h3
          className="w-1/6 font-bold leading-none bg-linear-to-l from-indigo-800 to-blue-700  pt-3 pl-2 pr-1 pb-3"
          style={{ textShadow: "2px 2px 2px blue" }}
        >
          JNTU Anantapur Attendance
        </h3>
        <div className=" flex w-5/6 pl-10 pt-3 pb-3 pr-10  font-bold  justify-between bg-linear-to-l from-indigo-800 to-blue-700 ">
          <h4 className=" flex items-center " >
            <IoMdMenu size="30" style={{ paddingRight: "4px" }} /> Dashboard
          </h4>
          <div className="flex items-center w-60 h-7  ">
            {!user? (<>
            <button className="p-1 w-20 ml-1 mr-4 rounded-xl text-blue-900 bg-white hover:bg-blue-800 hover:text-white" style={{border:"2px solid white"}} onClick={()=>navigate("/signin")}>Signin</button>
            <button className="p-1 w-20 ml-1 mr-4 rounded-xl text-white  hover:bg-white hover:text-blue-800 " style={{border:"2px solid white"}} onClick={()=>navigate("/login")}>Login</button>
            <button>  <IoPersonCircleSharp size="33" /></button>
            </>) :(<>  <span>Welcome {user} </span><button>  <IoPersonCircleSharp size="33" /></button> </>)}
          </div>
        </div>
      </nav>

    </>
  );
}

