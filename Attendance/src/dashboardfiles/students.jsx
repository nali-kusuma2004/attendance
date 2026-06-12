import React, { useEffect, useState } from "react";
import StudentChart from "./studentchart.jsx";
const API_URL = import.meta.env.VITE_API_URL;
export default function Student() {
  const [students, setStudents] = useState([]);
  const [openRow, setOpenRow] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const filtered = students.filter((s) =>
    s.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDetails = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  return (
    <div className="p-6 bg-indigo-300 min-h-screen">
          <h2 className=" w-full ml-180 mb-5 text-4xl text-amber-300 shadow-blue-600  align-center font-bold justify-center " style={{ textShadow: "2px 2px 2px rgba(37,125,235,0.6)"}}>Student Details</h2>
 {/* <div className="min-h-screen from-black via-[#1a1a1a] to-[#2c2c2c] p-6"></div>
           <StudentChart students={students} />
        </div> */}
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
       
        {/* Search */}
        <input
          type="text"
          placeholder="Search student..."
          className="border px-4 py-2  bg-white text-indigo-900 rounded-lg w-1/3 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Add Button */}
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600">
          + Add Student
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          
          <thead className="bg-gray-200 text-pink-600">
            <tr>
              <th className="p-3">Full Name</th>
              <th className="p-3">Roll No</th>
              <th className="p-3">Department</th>
              <th className="p-3">Year</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((student) => (
              <React.Fragment key={student._id}>
                
                {/* Main Row */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">
                    {student.fullName}
                  </td>
                  <td className="p-3">{student.rollNo}</td>
                  <td className="p-3">{student.branch}</td>
                  <td className="p-3">{student.year}</td>

                  <td className="p-3">
                    <button
                      onClick={() => toggleDetails(student._id)}
                      className="text-blue-600 hover:underline"
                    >
                      {openRow === student._id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {/* Expand Row */}
                {openRow === student._id && (
                  <tr className="bg-gray-50">
                    <td colSpan="5" className="p-4">
                      <div className="grid grid-cols-3 gap-4 text-gray-700">
                        <p><b>Parent phone:</b>{student.parentPhone}</p>
                        <p><b>Email:</b> {student.email}</p>
                        <p><b>Phone:</b> {student.phone}</p>
                        <p><b>Dept:</b> {student.branch}</p>
                        <p><b>Year:</b> {student.year}</p>
                        
                      </div>
                    </td>
                  </tr>
                )}

              </React.Fragment>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
