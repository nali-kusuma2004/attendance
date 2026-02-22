import React from 'react'
import Asideblock from "./asideblock.jsx"
import Mainblock from "./mainblock.jsx"
import {useState} from "react"
import { useEffect } from 'react'
export default function Dashboard() {
  const [page,setpage]=useState("dashboard");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
       <section className="flex">
       <Asideblock/>
       <Mainblock />

       </section>
       {error && (
        <p className="text-red-600 text-center mt-4">{error}</p>
      )}
       </>
)
}
