import React, { useState, useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import { SlSpeedometer } from "react-icons/sl";
import {
  AiOutlineLineChart,
  AiOutlineUsergroupAdd,
  AiOutlineRight,
  AiOutlineDown,
} from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header({ token }) {
  const userData = useSelector((state) => state.userData.data);

  const router = useRouter();
  const [usrManagement, setUsrManagement] = useState(false);

  const handleUsrManagement = () => {
    setUsrManagement(!usrManagement);
  };

  const userName = userData?.employee?.substring(0,2)

  return (
    <div className="py-5 px-10">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div className="drawer-content lg:hidden">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn p-0 drawer-button bg-transparent outline-none border-none"
            >
              <div className="flex items-center gap-3">
                <BiMenu size={35} />
              </div>
            </label>
          </div>
          <span className="font-bold">LOGO</span>
        </div>
        <div className="flex gap-5 items-center">
          <div className="bg-[#E3645C] flex w-12 h-12 rounded-full justify-center items-center">
            <span className="font-semibold text-white">{userName?.toUpperCase()}</span>
            {/* <Image /> */}
          </div>
          <div className="hidden md:flex flex-col">
            <span className="font-semibold">{userData.employee}</span>
            <span className="text-sm text-slate-400 ">{userData.email}</span>
          </div>
          <div>
            <AiOutlineDown size={20} />
          </div>
        </div>
      </div>
      <div className="drawer z-[1] lg:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full text-base-content bg-white">
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
                    router.pathname == "/user"
                      ? "bg-[#198564] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <span className="font-bold">User</span>
                </div>
              </details>
              <Link
                href="/auth/logout"
                className="flex gap-5 hover:bg-[#198564] p-3 hover:text-white cursor-pointer rounded-md"
              >
                <span>Logout</span>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
