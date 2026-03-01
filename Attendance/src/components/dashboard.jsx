import React from "react";
import Asideblock from "./asideblock.jsx";
import Mainblock from "./mainblock.jsx";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar.jsx";
export default function Dashboard() {
  // const [page,setpage]=useState("dashboard");
  // const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isauthenticated, setisauthenticated] = useState(false);
  const [open, setopen] = useState(false);
  const isopen = localStorage.getItem("opennavi");

  const togglesidebar = (state) => {
    setopen(state);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisauthenticated(true);
    }

    const navState = localStorage.getItem("opennavi");

    if (navState === "true") {
      setopen(true);
    }

    fetch("http://localhost:8000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setError("Access denied");
      });
  }, []);
  return (
    <>
      {/* { isauthenticated  && <Asideblock /> }  */}
      <Navbar togglesidebar={togglesidebar} isopen={open} />
      <section className=" flex w-full">
        {isauthenticated && open && (
          <div
            className={`transition-all duration-300 ${
              isopen ? "w-1/6" : "w-0"
            } `}
          >
            <Asideblock isopen={open} />{" "}
          </div>
        )}

        <div
          className={`${open ? "w-5/6" : "w-full"} transition-all duration-300`}
        >
          <Mainblock />
        </div>
        {/* {error && <p className="text-red-600 text-center mt-4">{error}</p>} */}
      </section>
    </>
  );
}
