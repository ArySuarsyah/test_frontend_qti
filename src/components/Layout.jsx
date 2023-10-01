import React, { useEffect, useState } from "react";
import { SlSpeedometer } from "react-icons/sl";
import {
  AiOutlineLineChart,
  AiOutlineUsergroupAdd,
  AiOutlineRight,
  AiOutlineDown,
} from "react-icons/ai";
import Image from "next/image";
import Header from "./Header";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from "@/helpers/cookieConfig";
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

export default function Layout({ children, userToken }) {
  const [usrManagement, setUsrManagement] = useState(false);
  const router = useRouter();

  const handleUsrManagement = () => {
    setUsrManagement(!usrManagement);
  };
 
  return (
    <div className="bg-[#f9f9f9] h-screen box-border overflow-x-hidden">
      <Header token={userToken}/>
      <div className="flex gap-3">
        <aside className="w-96 hidden lg:block">
          <div className="p-5 flex flex-col gap-5">
            <span className="font-bold text-[#66666675]">Analysis</span>
            <div
              onClick={() => router.push("/")}
              className={`flex gap-5 hover:bg-[#198564] p-3 hover:text-white cursor-pointer rounded-md ${
                router.pathname === "/" ? "bg-[#198564] text-white" : ""
              }`}
            >
              <SlSpeedometer size={25} />
              <span className="font-bold">Dashboard</span>
            </div>
            <div
              onClick={() => router.push("/sales")}
              className={`flex gap-5 hover:bg-[#198564] p-3 hover:text-white cursor-pointer rounded-md ${
                router.pathname === "/sales" ? "bg-[#198564] text-white" : ""
              }`}
            >
              <AiOutlineLineChart size={25} />
              <span className="font-bold">Sales</span>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-5">
            <span className="font-bold text-[#66666675]">Admin Access</span>
            <details className="dropdown mb-32">
              <summary
                onClick={handleUsrManagement}
                className={`my-1 flex justify-start items-center gap-5 hover:bg-[#198564] p-3 hover:text-white cursor-pointer rounded-md ${
                  usrManagement || router.pathname === "/user"
                    ? "bg-[#198564] text-white"
                    : ""
                }`}
              >
                <AiOutlineUsergroupAdd size={25} />
                <span className="font-bold">User Management</span>
                <div className="flex justify-center items-center">
                  {usrManagement ? <AiOutlineDown /> : <AiOutlineRight />}
                </div>
              </summary>
              <div
                onClick={() => router.push("/user")}
                className={`flex gap-5 p-3 hover:bg-[#198564] hover:text-white cursor-pointer rounded-md items-center ${
                  router.pathname === "/user"
                    ? "bg-[#198564] text-white"
                    : "bg-white text-black"
                }`}
              >
                <span className="font-bold">User</span>
              </div>
            </details>
          </div>
        </aside>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
