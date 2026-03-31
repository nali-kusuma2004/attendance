import React, { useEffect, useState } from "react";

export default function Present() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/attendance/present")
      .then(res => res.json())
      .then(data => setStudents(Array.isArray(data.attendance)  ? data.attendance : []) )
      .catch(err => console.error(err));
  }, []);
  console.log(students);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Today's Present Students</h2>
      <table className="min-w-full border">
        <thead className="bg-green-100">
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Roll No</th>
            <th className="border px-2 py-1">Department</th>
            <th className="border px-2 py-1">Year</th>
          </tr>
        </thead>
        <tbody>
          {students.map((att) => (
            <tr key={att._id}>
              <td className="border px-2 py-1">{att.studentId.fullName}</td>
              <td className="border px-2 py-1">{att.studentId.rollNo}</td>
              <td className="border px-2 py-1">{att.studentId.branch}</td>
              <td className="border px-2 py-1">{att.studentId.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}