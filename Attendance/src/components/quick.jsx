import React from 'react'
import {useNavigate} from "react-router-dom";
export default function Quick() {
const navigate=useNavigate();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
    <button className="bg-blue-600 text-white p-4 rounded-xl shadow hover:bg-blue-700">
      + Add Staff
    </button>

    <button className="bg-purple-600 text-white p-4 rounded-xl shadow hover:bg-purple-700"  onClick={()=>{navigate("/addstudent")}}>
      + Add Student
    </button>

    <button className="bg-green-600 text-white p-4 rounded-xl shadow hover:bg-green-700">
      🧬 Register Biometrics
    </button>

    <button className="bg-gray-800 text-white p-4 rounded-xl shadow hover:bg-black">
      📄 Export Report
    </button>
  </div>

    </>
  )
}
