import Layout from "@/components/Layout";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { BarChart } from "@/components/BarChart";
import { DoughnutChart } from "@/components/DoughnutChart";
import axios from "axios";

export default function Index() {
  const [salesData, setSalesData] = useState([]);
  const [dounghnutCrtData, setDounghnutCrtData] = useState([]);
  const getDataSales = useCallback(async () => {
    const response = await axios.get(
      "https://mocki.io/v1/f5c5ae0e-9434-4d57-87c2-6fd119a368cf"
    );
    setSalesData(response.data.sales);
  }, []);

  const getDounghnut = useCallback(async () => {
    const response = await axios.get(
      "https://mocki.io/v1/2c0583e2-e655-4963-9d10-9cc45307f478"
    );
    setDounghnutCrtData(response.data.sales);
  }, []);

  useEffect(() => {
    getDataSales();
    getDounghnut();
  }, [getDataSales, getDounghnut]);

  // console.log(salesData)
  return (
    <div>
      <Layout>
        <div className="flex gap-5 m-5">
          <div className="bg-white p-5 h-full">
            <span className="font-bold">Card Title</span>
            <BarChart dataChart={salesData} />
            {/* <Image
            width={500}
            height={500}
            src='/chart.png'
            alt="chart"
            /> */}
          </div>
          <div className="h-full bg-white p-5 ">
            <span className="font-bold">Card Title</span>
            <DoughnutChart dataChart={dounghnutCrtData} />
          </div>
        </div>
      </Layout>
    </div>
  );
}
