import React from "react";
import { FaUserTie } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsTwitterX } from "react-icons/bs";
import { motion } from "framer-motion";
import { VscSignIn } from "react-icons/vsc";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
export default function Login() {
  const [active, setactive] = React.useState(false);
  const [userrole, setuserrole] = React.useState("");
  const [showpass, setshowpass] = useState(true);
  const [err, seterr] = useState("");
  const [form, setform] = React.useState({
    role: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleuser(e) {
    e.preventDefault();
    setactive(!active);
    const role = e.target.innerText.split(" ")[0].toLowerCase();
    setuserrole(role);
    setform({ ...form, role: role });
  }

  function showpassword() {
    setshowpass(!showpass);
  }

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  async function checkuser(e) {
    e.preventDefault();
    if (!validatePassword(form.password)) {
      seterr(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      );
    }
    const res=await fetch("http://localhost:8000/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(form),
    })

    const data=await res.json();
    if(res.status===401){
      seterr(data.message);
    }
    
    if(res.ok){
      localStorage.setItem("token",data.token);
      localStorage.setItem("username",data.username);
      localStorage.setItem("role",data.role);
      seterr("");
      if(data.role==="user"){
        navigate("/userdashboard" ,{
        state:{username: form.username} })
      }
      else{
        navigate("/dashboard");
      }
    }

    console.log("Form submitted:", form);
    
    setform({
      role: "",
      username: "",
      password: "",
    });

    
  }

  return (
    <>
     <Navbar />
    
    <section className="bg-linear-to-l from-blue-900 to-purple-600 h-180 w-full flex items-center justify-center bg-cover">
      <div
        className="flex  rounded-lg shadow-lg w-300 h-150 bg-cover"
        style={{
          backgroundImage: `url(https://static.vecteezy.com/system/resources/thumbnails/011/635/825/small/abstract-square-interface-modern-background-concept-fingerprint-digital-scanning-visual-security-system-authentication-login-vector.jpg)`,
        }}
      >
        <div className=" relative w-1/2 bg-slate-100 overflow-hidden ">
          <motion.div
            className="absolute w-100 h-100 bg-purple-900 rounded-full  top-50"
            animate={{ x: -100 }}
            transition={{ duration: 0 }}
          />
          <motion.div
            className="absolute w-140 h-140 bg-purple-800 rounded-full"
            animate={{ x: -150, y: -70 }}
            transition={{ duration: 0 }}
          />
          <motion.div
            className="absolute w-20 h-20 bg-purple-800 rounded-full top-120 left-70 bottom-5"
            animate={{ x: 200, y: 20 }}
            transition={{ duration: 0 }}
          />
          <motion.div
            className="absolute w-20 h-20 bg-purple-800 rounded-full  left-85"
            animate={{ x: 200, y: -20 }}
            transition={{ duration: 0 }}
          />
          <p className="absolute top-30 left-20 text-3xl text-slate-200  font-bold">
            WELCOME BACK
          </p>
          <div className="absolute top-60 left-20 text-xl  text-shadow-amber-400 text-amber-400 w-1/2">
            <p className="text-md ">
              To keep connected with us please login with your personal info
            </p>
          </div>
          <VscSignIn
            className="absolute text-9xl text-yellow-400 top-80 left-100 "
            color="blue"
          />
        </div>
        <form className="w-1/2  text-white p-8 shadow-amber-100 backdrop-blur-md p-6 rounded-lg shadow-md">
          {/* <label className="text-3xl font-bold text-shadow-amber-600 mb-4 items-center pl-40">Login</label><br></br> */}
          <FaUserTie className="text-7xl border-b-amber-50 text-amber-600 ml-60 mb-4" />
          <br></br>
          <div className="flex bg-blue-700 rounded-xl mb-4 ml-20 w-100 h-10">
            <button
              className={` text-white w-1/2 font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline ${active ? "bg-amber-600" : " bg-blue-700"}`}
              onClick={handleuser}
            >
              User Signin
            </button>
            <button
              className={` w-1/2  text-black font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline ${!active ? "bg-amber-600" : "bg-blue-700"} `}
              onClick={handleuser}
            >
              Admin Signin
            </button>
          </div>
          <label className="text-md ml-10 mb-4  justify-center">Username</label>
          <br></br>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            className=" w-md h-10 ml-10 mt-3 pl-4 mb-4 bg-white rounded-xl text-blue-900"
            onChange={(e) => setform({ ...form, username: e.target.value })}
          />
          <br></br>
          <label className="text-md  ml-10 mb-4">Password</label>
          <br></br>
          <input
            type={showpass ? "password" : "text"}
            value={form.password}
            placeholder="Password"
            className=" w-md mt-3 ml-10 h-10 pl-5  bg-white rounded-xl text-blue-900"
            onChange={(e) => setform({ ...form, password: e.target.value })}
          />
          {!showpass ? (
            <FaEye
              size="20"
              color="blue"
              onClick={() => showpassword()}
              className="relative bottom-8 left-110 text-gray-500 cursor-pointer"
            />
          ) : (
            <LuEyeClosed
              size="20"
              color="orange"
              onClick={() => showpassword()}
              className="relative bottom-8 left-110 text-gray-500 cursor-pointer"
            />
          )}
          <br></br>
          <label className="float-right">
                  <a
                    href="#"
                    className="text-blue-500 hover:text-blue-700 text-sm"
                    onClick={()=>{navigate("/forgotpasswd")}}
                  >
                    Forgot Password?
                  </a>
                </label>
          {err && (
            <p className=" font-bold text-sm mb-4 text-red-600 mt-0 ml-10">{err}</p>
          )}
          <button
            type="button"
            className="w-sm h-9 ml-15 bg-green-600 rounded-lg"
            onClick={checkuser}
          >
            Log in{" "}
          </button>
          <br></br>
          {/* <div className="flex justify-around mt-5 ">
            <button className="border-2 mt-4 ml-10 rounded-lg p-3 w-15 ">
              <FcGoogle className="text-3xl" />
            </button>
            <button className="border-2 mt-4 mr-10 rounded-lg p-3 w-15 ">
              <BsTwitterX className="text-3xl text-blue-600" />
            </button>
          </div> */}
          <p className="mt-20 ml-40">
            Create New Account ?{" "}
            <a href="/signin" className="text-violet-600 font-bold">
              {" "}
              Signin
            </a>
          </p>
        </form>
      </div>
    </section>
    </>
  );
}
