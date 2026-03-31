import React, { useEffect, useState } from "react";

export default function Absent() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/absent")
      .then(res => res.json())
      .then(data => setStudents(Array.isArray(data.absent) ? data.absent : []))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="bg-gray-100 min-h-screen ">
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Today's Absent Students</h2>
      <table className="min-w-full border">
        <thead className="bg-red-100">
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Roll No</th>
            <th className="border px-2 py-1">Department</th>
            <th className="border px-2 py-1">Year</th>
          </tr>
        </thead>
        <tbody>
          {students.map(att => (
            <tr key={att._id}>
              <td className="border px-2 py-1">{att.fullName}</td>
<td className="border px-2 py-1">{att.rollNo}</td>
<td className="border px-2 py-1">{att.branch}</td>
<td className="border px-2 py-1">{att.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </section>
  );
}