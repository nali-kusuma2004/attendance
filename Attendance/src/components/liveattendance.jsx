import React from "react";
import { useEffect } from "react";
import Charts from "./charts.jsx";
export default function Liveattendance() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    const attendancefetch = async () => {
      const res = await fetch("http://localhost:8000/api/today-attendance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setData(data);
      console.log(data);
    };
    attendancefetch();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Live Attendance */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">Live Attendance</h2>
          <ul className="space-y-3  h-40 overflow-scroll">
            {data &&
              data.map((entry) => 
(
                  <>
                    <li className="flex justify-around bg-purple-400 text-white  p-1 rounded-lg">
                      <span className="font-medium pl-2">{entry.biometricid}</span>
                      <span className=" font-bold">{entry.studentId.name}</span>
                      <span className="text-red-600 pr-2">{new Date(entry.date).toLocaleTimeString()}</span>
                    </li>
                  </>
                )
              )}
              {!data && <p className="text-gray-400 text-center">No attendance data available.</p>

              }
          </ul>
        </div>

        {/* Attendance Chart Placeholder */}
        <Charts />
      </div>
    </>
  );
}
