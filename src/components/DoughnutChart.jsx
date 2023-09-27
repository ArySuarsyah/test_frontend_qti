import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({dataChart}) {
    const data = {
        labels: dataChart.map((item) => item.date),
        datasets: [
          {
            label: "Legend 1",
            data: dataChart.map((item) => item.products_in),
            backgroundColor: ["#198564"],
            borderWidth: 1,
          },
          {
            label: "Legend 2",
            data: dataChart.map((item) => item.products_out),
            backgroundColor: ["#F9D14B"],
            borderWidth: 1,
          },
        ],
      };
    
      const options = {
        indexAxis: "y",
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              pointStle: "circle",
            },
          },
        },
      };
  return(
    <div className='w-[20em] h-[20em]'>
      <Doughnut data={data} />
    </div>
  );
}
