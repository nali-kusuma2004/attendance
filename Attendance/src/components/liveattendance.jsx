import React from "react";
import { useEffect } from "react";
import Charts from "./charts.jsx";
export default function Liveattendance() {
  const [data, setData] = React.useState([]);
  const [chartData, setChartData] = React.useState(null);
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
      // console.log(data);
      setData(data);
      const branchCount = {};

      data.forEach((item) => {
        const branch = item.studentId?.branch || "Unknown";
        branchCount[branch] = (branchCount[branch] || 0) + 1;
      });

      const labels = Object.keys(branchCount);
      const values = Object.values(branchCount);

      setChartData({
        labels,
        datasets: [
          {
            label: "Attendance by Branch",
            data: values,
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      });

      console.log("Chart Data:", {
  labels,
  values
});
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
              data.map((entry) => {
                const time = new Date(entry.date);
                const hours = time.getHours();

                let bgColor = "";

                if (hours < 16) {
                  bgColor = "bg-orange-400"; // before 4 PM
                } else if (hours >= 16 && hours < 20) {
                  bgColor = "bg-green-500"; // 4 PM - 8 PM
                } else if (hours >= 20 && hours < 21) {
                  bgColor = "bg-red-500"; // 8 PM - 9 PM
                } else {
                  bgColor = "bg-gray-400"; // optional fallback
                }

                return (
                  <li
                    key={entry._id}
                    className={`flex justify-around text-white p-1 rounded-lg ${bgColor}`}
                  >
                    <span className="font-medium pl-2">
                      ✅ {entry.biometricId}
                    </span>

                    <span className="font-bold">
                      {entry.studentId.fullName}
                    </span>

                    <span className="pr-2">{time.toLocaleTimeString()}</span>
                  </li>
                );
              })}
            {data.length === 0 && (
              <p className="text-gray-400 text-center">
                No attendance data available.
              </p>
            )}
          </ul>
        </div>

        {/* Attendance Chart Placeholder */}
        <div className="bg-white rounded-xl shadow p-5">
  {chartData?.labels && chartData.labels.length > 0 ? (
    <Charts data={chartData} />
  ) : (
    <p>Loading chart...</p>
  )}
</div>
        {/* <Charts /> */}
      </div>
    </>
  );
}
