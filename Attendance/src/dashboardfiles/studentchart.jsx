import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StudentChart({ students }) {

  const deptCount = {};

  students.forEach((s) => {
    deptCount[s.branch] = (deptCount[s.branch] || 0) + 1;
  });

  const data = {
    labels: Object.keys(deptCount),
    datasets: [
      {
        data: Object.values(deptCount),
        backgroundColor: [
          "#D4AF37", // gold
          "#C5A028",
          "#B8962E",
          "#E6C200",
          "#A67C00",
          "#FFD700"
        ],
        borderColor: "#1a1a1a",
        borderWidth: 2,
        hoverOffset: 12
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#f5e6c8", // light gold text
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} students`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg mb-6 w-1/6 ">
      
      <h2 className="text-xl text-center font-semibold mb-4 text-[#D4AF37]">
        🥧 Department Strength
      </h2>

      <Pie data={data} options={options} />
    </div>
  );
}