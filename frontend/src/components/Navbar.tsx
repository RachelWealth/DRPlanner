"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import Feedback from "./Feedback";
import Popup from "reactjs-popup";
import Image from "next/image";
import { HiMenuAlt1 } from "react-icons/hi";
import mylogo from "../../public/drlogo.jpg";
import Link from "next/link";
import Login from "./Login";
import { useSelector } from "react-redux";
import Profile from "./Profile";
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const {curUser} = useSelector((state: any) =>state.user)
  return (
    <div className="w-full h-12 bg-white border-b-[1px] border-b-gray-400">
      <nav
        className="h-full m-1 max-w-screen-xl mx-auto px-4 xl:px-0 flex 
        items-center justify-between gap-2"
      >
        <div className="flex-1 lg:inline-flex items-center lg:left-1 justify-start pl-10">
          <Link
            href={"/"}
            className="flex items-center gap-3 font-semibold hover:text-blue-200"
          >
            <Image src={mylogo} alt="logo" className="w-24" />
          </Link>
        </div>
        <div
          className={
            "flex-1 relative w-full hidden lg:inline-flex lg:w-[300px] h-10 text-base text-primeColor border-[1px] border-black items-center gap-2 justify-between px-6 rounded-md"
          }
        >
          <input
            type="text"
            placeholder="Please input the key word"
            className="flex-1 h-full  outline-none bg-transparent placeholder:text-gray-600"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          {searchQuery ? (
            <div
              onClick={() => setSearchQuery("")}
              className="w-5 h-5 hover:cursor-pointer hover:text-red-500 duration-200"
            >
              <IoIosClose />
            </div>
          ) : (
            <div className="w-5 h-5 hover:cursor-pointer">
              <CiSearch />
            </div>
          )}
        </div>
        <div className="flex-1  lg:inline-flex justify-end items-center  hidden lg:right-4   gap-2 h-10 ">
          <div className="pr-4">
            <Link href={"/studio"}>Studio</Link>
          </div>
          <div>
            <Popup
              trigger={
               
                <button
                  className="setting bg-black text-white py-2 px-4 rounded-md"
                  type="button"
                  onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
                >
                  {/* {
                    !isFeedbackOpen && <Feedback />
                  } */}
                  Feedback
                </button>
              }
              modal
              nested
            >
              {<Feedback />}
            </Popup>
          </div>
          <div>
            <button
              className="feedback text-black py-2 px-4 rounded-md"
              type="button"
            >
              Setting
            </button>
          </div>

          <div>
            {curUser ? <Profile /> : <Login />}
            
          </div>
        </div>
        <HiMenuAlt1 className="inline-flex md:hidden cursor-pointer w-8 h-6 " />
      </nav>
    </div>
  );
};

export default Navbar;
