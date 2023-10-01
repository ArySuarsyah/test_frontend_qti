import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ dataChart }) {
  const data = {
    labels: dataChart.map((item) => item.date),
    datasets: [
      {
        data: dataChart.map((item) => item.products_in),
        backgroundColor: ["#FD7D36", "#F9D14B", "#24C2B9", "#202330"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio:false,
    plugins: {
      legend: {
        display: false,
      }
    },
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-[100%] h-96">
      <div className="lg:w-[100%] relative">
        <Doughnut data={data} options={options} />
        <div className="absolute bottom-[32%] left-[42%] text-center w-10">
          <span className="font-bold break-words">Total 100</span>
        </div>
      </div>
      <div className="grid grid-cols-2 self-center gap-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-[#202330]"></div>
          <div>Legend 1</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-[#F9D14B]"></div>
          <div>Legend 2</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-[#FD7D36]"></div>
          <div>Legend 3</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-[#24C2B9]"></div>
          <div>Legend 4</div>
        </div>
      </div>
    </div>
  );
}
