import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function BarChart({ dataChart }) {
  const data = {
    labels: dataChart.map((item) => item.date),
    datasets: [
      {
        label: "Legend 1",
        data: dataChart.map((item) => item.products_in),
        backgroundColor: ["#198564"],
        
      },
      {
        label: "Legend 2",
        data: dataChart.map((item) => item.products_out),
        backgroundColor: ["#F9D14B"],
        
      },
    ],
  };

  const options = {
    indexAxis: "y",
    maintainAspectRatio:false,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };
  return (
    <div className="lg:w-[100%] h-96">
      <Bar options={options} data={data} />
    </div>
  );
}
