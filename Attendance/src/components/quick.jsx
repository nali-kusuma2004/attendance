import React from 'react'
import {useNavigate} from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
export default function Quick() {
const navigate=useNavigate();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
    <button className="bg-blue-600 text-white p-4 rounded-xl shadow hover:bg-blue-700" onClick={()=>{navigate("/addstaff")}}>
      + Add Staff
    </button>

    <button className="bg-purple-600 text-white p-4 rounded-xl shadow hover:bg-purple-700"  onClick={()=>{navigate("/addstudent")}}>
      + Add Student
    </button>

    <button className="bg-green-600 text-white p-4 rounded-xl shadow hover:bg-green-700">
      🧬 Register Biometrics
    </button>

    <button
  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
  onClick={() => {
    fetch(`${API_URL}/api/export-attendance`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Attendance_${new Date().toLocaleDateString()}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => console.error(err));
  }}
>
 📝 Export Report
</button>
  </div>

    </>
  )
}
