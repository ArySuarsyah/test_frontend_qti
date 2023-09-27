import Layout from "@/components/Layout";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { BarChart } from "@/components/BarChart";
import { DoughnutChart } from "@/components/DoughnutChart";
import axios from "axios";

export default function Index() {
  const [salesData, setSalesData] = useState([]);
  const getDataSales = useCallback(async () => {
    const response = await axios.get(
      "https://mocki.io/v1/f5c5ae0e-9434-4d57-87c2-6fd119a368cf"
    );
    setSalesData(response.data.sales)
  },[]);

  useEffect(()=>{
    getDataSales()
  }, [getDataSales])

  // console.log(salesData)
  return (
    <div>
      <Layout>
        <div className="flex">
          <div>
            <BarChart dataChart={salesData}/>
            {/* <Image
            width={500}
            height={500}
            src='/chart.png'
            alt="chart"
            /> */}
          </div>
          <div className="border-[1px] border-black h-full p-5">
            <DoughnutChart dataChart={salesData}/>
          </div>
        </div>
      </Layout>
    </div>
  );
}
