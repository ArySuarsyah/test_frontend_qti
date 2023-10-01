import Layout from "@/components/Layout";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { BarChart } from "@/components/BarChart";
import { DoughnutChart } from "@/components/DoughnutChart";
import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from "@/helpers/cookieConfig";
import http from "@/helpers/http";
import checkCredentials from "@/helpers/checkCredentials";



export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token;
    checkCredentials(token, res);

    return {
      props: {
        token,
      },
    };
  },
  cookieConfig
);


export default function Index({token}) {
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

  return (
    <>
      <Layout userToken={token}>
        <div className="md:flex gap-5 m-5 lg:w-[95%] box-border">
          <div className="bg-white p-5 box-border md:w-[80%]">
            <span className="font-bold">Card Title</span>
            <BarChart dataChart={salesData} />
          </div>
          <div className="bg-white p-5 box-border md:w-[40%]">
            <span className="font-bold">Card Title</span>
            <DoughnutChart dataChart={dounghnutCrtData} />
          </div>
        </div>
      </Layout>
    </>
  );
}
