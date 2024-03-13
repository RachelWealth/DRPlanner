import React from "react";
import mylogo from "../../public/drlogo.jpg";
import Image from "next/image";
import Link from "next/link";
import { IoReturnDownBack } from "react-icons/io5";
const StudioHeader = (props: any) => {
  if (typeof window !== "undefined") {
  return (
    <div>
      <div className="p-5 bg-black h-12 text-white flex items-center justify-between gap-2">
        <Link href={'/'} className="flex items-center gap-3 font-semibold hover:text-blue-200">
            <IoReturnDownBack className="text-2xl" />Go to Website</Link>
        <Image src={mylogo} alt="logo" className=" object-scale-down  h-8" />
        <p className="text-sm">Admin Studio for DRPlanner ToDo List</p>
      </div>
      {props.renderDefault(props)}
    </div>
  );
};}

export default StudioHeader;
