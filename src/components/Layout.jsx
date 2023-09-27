import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { SlSpeedometer } from "react-icons/sl";
import {
  AiOutlineLineChart,
  AiOutlineUsergroupAdd,
  AiOutlineRight,
  AiOutlineDown,
} from "react-icons/ai";
import Image from "next/image";

export default function Layout({ children, token: userToken }) {
  const [usrManagement, setUsrManagement] = useState(false);

  const handleUsrManagement = () => {
    setUsrManagement(!usrManagement);
  };
  return (
    <div className="bg-white">
      <div className="py-3 px-10">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <BiMenu size={35} />
            <span className="font-bold">LOGO</span>
          </div>
          <div className="flex gap-5 items-center">
            <div className="bg-[#E3645C] flex w-12 h-12 rounded-full justify-center items-center">
              <span className="font-semibold text-white">RA</span>
              {/* <Image /> */}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Riana Andra</span>
              <span className="text-sm text-slate-400">Administrator</span>
            </div>
            <div>
              <AiOutlineDown size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <aside className="w-96">
          <div className="p-5 flex flex-col gap-5">
            <span className="font-bold text-[#66666675]">Analysis</span>
            <div className="flex gap-5 hover:bg-[#198564] p-3 hover:text-white cursor-pointer rounded-md">
              <SlSpeedometer size={25} />
              <span className="font-bold">Dashboard</span>
            </div>
            <div className="flex gap-5 hover:bg-[#198564] p-3 hover:text-white cursor-pointer rounded-md">
              <AiOutlineLineChart size={25} />
              <span className="font-bold">Sales</span>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-5">
            <span className="font-bold text-[#66666675]">Admin Access</span>
            <details className="dropdown mb-32">
              <summary
                onClick={handleUsrManagement}
                className="m-1 flex justify-start items-center gap-5 hover:bg-[#198564] p-3 hover:text-white cursor-pointer rounded-md"
              >
                <AiOutlineUsergroupAdd size={25} />
                <span className="font-bold">User Management</span>
                <div className="flex justify-center items-center">
                  {usrManagement ? <AiOutlineDown /> : <AiOutlineRight />}
                </div>
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full">
                <div className="flex gap-5 bg-[#198564] p-3 text-white cursor-pointer rounded-md items-center">
                  <span className="font-bold">User</span>
                </div>
              </ul>
            </details>
          </div>
        </aside>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
