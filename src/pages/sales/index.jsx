import Layout from "@/components/Layout";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Index() {
  const [salesData, setSalesData] = useState([]);

  const getData = useCallback(async () => {
    const { data } = await axios.get(
      "https://mocki.io/v1/880b08a2-00a6-4554-bc96-9b67f5017791"
    );
    setSalesData(data);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);
  console.log(salesData);
  return (
    <>
      <Layout>
        <div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Sales</span>
            <span className="text-[#a3a3a3] font-semibold">June 2022</span>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-xs font-bold">
              <thead className="h-14 text-sm">
                <tr>
                  <th>Product Name</th>
                  <th>Categories</th>
                  <th>Amount</th>
                  <th>Items Sold</th>
                  <th>Price</th>
                  <th>Sales</th>
                </tr>
              </thead>
              <tbody className="bg-white p-5">
                {salesData.map((item, index) => {
                  return (
                    <tr key={`sales ${index + 1}`}>
                      <td className="p-5">
                        <div className="flex items-center gap-5">
                          <Image
                            width={60}
                            height={60}
                            src={`/${item.product}.jpg`}
                            alt={item.product}
                          />
                          {item.product}
                        </div>
                      </td>
                      <td>
                        <div className="p-2 w-24 text-center text-[#195CA8] bg-[#569bf03b] rounded-lg">{item.category}</div>
                      </td>
                      <td>{`${item.amount} in stock`}</td>
                      <td>{item.item_sold}</td>
                      <td>Rp. {Number(item.price).toLocaleString("id")}</td>
                      <td>Rp. {Number(item.sales).toLocaleString("id")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
}
