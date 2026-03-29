import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Charts({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-4">
        Department Attendance
      </h2>

      {data?.labels && data.labels.length > 0 ? (
        <Bar data={data} />
      ) : (
        <p className="text-gray-400 text-center">
          No chart data available
        </p>
      )}
    </div>
  );


  
}