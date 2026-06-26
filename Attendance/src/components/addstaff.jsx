import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export default function Addstaff() {
  const [staff, setStaff] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    department: "",
    shift: "",
    experience: "",
    image: ""
  });

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_URL}/api/staff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(staff)
      });

      const data = await res.json();
      if (res.ok) {
        alert("Staff added successfully!");
        setStaff({
          name: "",
          role: "",
          phone: "",
          email: "",
          department: "",
          shift: "",
          experience: "",
          image: ""
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add staff");
    }
  };

  return (
       <section className=" h-200 pt-20"style={{backgroundImage: "url('https://www.jntuacea.ac.in/images/shilpa.jpg')" , backgroundSize:"cover",backgroundPosition:"center"}}>
    <div className="p-4 backdrop-blur-lg rounded-xl border-4  text-amber-500 shadow max-w-md mx-auto" >
              <h2 className="text-xl font-bold mb-4 ml-40 text-indigo-700" style={{textShadow:"2px 2px 2px rgba(255,255,255,0.7)"}}>Add Staff</h2>
      {["name","role","phone","email","department","shift","experience","salary"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={staff[field]}
          onChange={handleChange}
          className="border p-2 mb-2 w-full rounded text-purple-800 bg-white"
        />
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-full"
      >
        + Add Staff
      </button>
    </div>
    </section>
  );
}
