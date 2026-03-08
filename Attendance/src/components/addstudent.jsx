import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
export default function Addstudent() {

const [formData, setFormData] = useState({
  name: "",
  rollNo: "",
  department: "",
  email: "",
  phone: "",
  biometricid: "",
});

const [message, setMessage] = useState("");

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8000/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(formData)
    });
      console.log(formData);
    const data = await res.json();

    if(res.ok){
      setMessage("Student added successfully ✅");
      setFormData({
        name:"",
        rollNo:"",
        department:"",
        email:"",
        phone:"",
        biometricid:""
      });

    }else{
      setMessage(data.message);
    }

  } catch (error) {
    setMessage("Server error");
  }
};

return (
    <> 
     <Navbar />
<div className="h-190 p-4 " style={{backgroundImage:"url(https://t4.ftcdn.net/jpg/06/34/14/27/360_F_634142702_krpVzitHatLALEzzwN5TXBJGr8JeOr1C.jpg)" , backgroundSize:"cover"}}>

<h1 className="text-4xl font-bold mb-6 text-yellow-400 pl-200 " style={{textShadow :"2px 2px 4px yellow"}}>Add Student</h1>

{message && <p className="mr-10 bg-blue-100 p-3 rounded-xl float-right text-green-600 animate-bounce">{message}</p>}

<form onSubmit={handleSubmit} className="bg-white p-16 rounded-xl shadow w-130 ml-150">

<input
type="text"
name="name"
placeholder="Student Name"
value={formData.name}
onChange={handleChange}
className="border rounded-xl p-2 w-full mb-3"
/>

<input
type="username"
name="rollNo"
placeholder="Roll Number"
value={formData.rollNo}
onChange={handleChange}
className="border rounded-xl p-2 w-full mb-3"
/>

<input
type="text"
name="department"
placeholder="Department"
value={formData.department}
onChange={handleChange}
className="border rounded-xl p-2 w-full mb-3"
/>

<input
type="email"
name="email"
placeholder="Email"
value={formData.email}
onChange={handleChange}
className="border rounded-xl p-2 w-full mb-3"
/>

<input
type="number"
name="phone"
placeholder="Phone"
value={formData.phone}
onChange={handleChange}
className="border rounded-xl p-2 w-full mb-4"
/>

<input
type="username"
name="biometricid"
placeholder="Bio metric ID "
value={formData.biometricid}
onChange={handleChange}
className="border rounded-xl p-2 w-full mb-4"
/>

<button className="bg-blue-600 text-white px-30 py-2 ml-8 rounded-2xl">
Add Student
</button>

</form>


</div>
</>
);
}