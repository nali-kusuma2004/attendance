import React from "react";
import { motion } from "framer-motion";
import { BsPersonCircle } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import { LuEyeClosed } from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
export default function Signin() {


  const [showpass, setshowpass] = useState(false);
  const [form ,setform]=useState({
    username:"",
    password:"",
    role:"",
  });
  const[loggeduser,setloggeduser]=useState("");
  const navigate=useNavigate();
  const [active,setactive]=useState(false);
  const [err,seterr]=useState("");
  const [userrole,setuserrole]=useState(""); 
  const [page,setpage]=useState("signin");
  
  function handleuser(e){
    e.preventDefault();
    setactive(!active);
    const role=e.target.innerText.split(" ")[0].toLowerCase();
    setuserrole(role);
    setform({...form,role:role});  
  }
  



  async function handledata(e){
      e.preventDefault();
    if(!validatePassword(form.password)){
       seterr("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character like @,$,!,%,*,?,&.");
    }
    else{
      try{
      const res=await fetch("http://localhost:8000/sign",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(form),
      });
      //  console.log(res);
      //  console.log(userrole);
       const data= await res.json();
         const username = form.username;
setloggeduser(username);
localStorage.setItem("username", username);
localStorage.setItem("role", userrole);

        // console.log(data);
       if(res.status===409){
        alert("User already exists"); 
        navigate("/login");   
       }
       if(res.status===201){
        alert("User Created Successfully");
         navigate("/dashboard");
       }

       seterr("");
       setform({
      username:"",
      password:""
        });

      setpage("dashboard");
  }
    catch(err){
      console.error("Error during sign in:", err);
    }
  }
}


  function showpassword() {
    setshowpass(!showpass);
  }

  const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

useEffect(() => {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
}, []);
  return (
    <>
      <section
        className="h-180 w-full bg-cover bg-center "
        style={{
          backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtJCjo481_saXQLM7EMYa75y3UE-_164Hm6Q&s)`,
        }}
      >
        <div className="relative p-8">
          {/* <motion.div
            className="absolute w-32 h-32 bg-gray-800 rounded-full opacity-70 top-40 right-10"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute w-24 h-24 bg-white rounded-full opacity-70 top-30 left-10 "
            animate={{ y: [0, 25, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-32 h-32 bg-gray-800 rounded-full opacity-70 top-80  left-10"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute w-24 h-24 bg-white rounded-full opacity-70 top-100 right-20"
            animate={{ y: [0, 25, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          /> */}
        </div>
        <div
          className="  backdrop-blur-lg  text-black  w-4/6 h-160 ml-60  rounded-xl"
          style={{ boxShadow: "2px 3px 3px 3px rgba(255,255,255,0.5)" }}
        >
          <div
            className="absolute w-1/2 min-h-full rounded-l-xl p-10"
            style={{
              backgroundImage: `url(https://media.istockphoto.com/id/2163983591/vector/abstract-multicolored-gradient-vector-background-design-wallpaper-template-with-geometric.jpg?s=612x612&w=0&k=20&c=wb1CT6XfnlzyhA63kMaN6LW0EM-ltGJSPSPlSW9qHos=)`,
              backgroundSize: "cover",
            }}
          >
            <p className="m-3 p-5 text-3xl  text-blue-900 font-bold">
              {" "}
              WELCOME TO JNTUA{" "}
            </p>
            <h2 className="relative text-2xl top-69 left-40 font-bold mb-4 text-orange-500">
              JNTU Attendance Portal
            </h2>
            <p className="text-2xl text-gray-900 opacity-90 mt-20 ml-49">
              Join us to streamline attendance tracking with a secure and
              intelligent system.
            </p>
            <motion.div
              className="absolute w-32 h-32 bg-orange-600 rounded-full  top-60  left-10"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, ease: "easeIn" }}
            />

            <motion.div
              className="absolute w-24 h-24 bg-orange-400 rounded-full bottom-2 right-20"
              animate={{ y: [0, 25, 0] }}
              transition={{ duration: 6, ease: "easeIn" }}
            />
            <motion.div
              className="absolute w-20 h-20 bg-blue-600 opacity-70 rounded-full  top-10  right-5"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, ease: "easeIn" }}
            />

            <motion.div
              className="absolute w-15 h-15 bg-blue-400 rounded-full  bottom-10 left-5"
              animate={{ y: [0, 25, 0] }}
              transition={{ duration: 6, ease: "easeIn" }}
            />
          </div>

          <div className=" relative w-1/2 p-10   h-full justify-center items-center float-right">
            <form className=" bg-white min-h-full rounded-xl p-10" >
              <BsPersonCircle
                size="80" color="black"
                className="w-full text-blue-700 opacity-70"
              />
              <h3 className="text-2xl text-orange-600 font-bold mb-6 mt-5 pl-40 w-full">Sign In</h3>
              <div className="flex bg-amber-700 rounded-xl mb-4">
                <button className={` text-white w-1/2 font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline ${active ? "bg-blue-600" :" bg-amber-700"}`} onClick={handleuser}>
                  User Signin
                </button>
                <button className={` w-1/2  text-black font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline ${!active ? "bg-gray-600" :"bg-amber-700"} `} onClick={handleuser}>
                  Admin Signin
                </button>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"

                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  value={form.username}
                  placeholder="Enter your username"
                  onChange={(e)=>setform({...form,username:e.target.value})}
                />
              </div>
              <div className=" mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  value={form.password}
                  type={showpass ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(e)=>setform({...form,password:e.target.value})}
                />
                
                {showpass ? (
                  <FaEye
                    size="20" color="blue"
                    onClick={() => showpassword()}
                    className="relative bottom-7 left-90 text-gray-500 cursor-pointer"
                  />
                ) : (
                  <LuEyeClosed
                    size="20" color="orange"
                    onClick={() => showpassword()}
                    className="relative bottom-7 left-90 text-gray-500 cursor-pointer"
                  />
                )}
                {err && <p className="text-red-500 text-xs mt-2">{err} </p>}
              </div>

              {/* <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Remember Me</span>
                </label>
                <label className="float-right">
                  <a
                    href="#"
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Forgot Password?
                  </a>
                </label>
              </div> */}
              <div className="flex items-center justify-between">
                <button
                  className="cursor-pointer bg-blue-500 w-full  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline  mt-3"
                  type="button"
                  onClick={(e)=>{handledata(e);}}
                >
                  Sign In
                </button>
              </div>
               <div>
                <p className="text-sm  ml-10 mt-4" onClick={()=>{navigate("/login")}}>
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-500 hover:text-blue-700">
                    Login here
                  </a>
                </p>
               </div>
            </form>
          </div>
        </div>
      </section>
      {/* {page==="dashboard" && <Navbar username={loggeduser}/>} */}
    </>
  );
}

//https://t4.ftcdn.net/jpg/03/57/34/39/360_F_357343965_u58BFcRrziBVMqgt6liwPHJKcIjHsPnc.jpg
// https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg?semt=ais_se_enriched&w=740&q=80
