import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";

export default function Header() {
  return (
    <div className="py-5 px-10">
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
  );
}
