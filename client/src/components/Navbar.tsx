"use client";
import { relative } from "path";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import Feedback from "./Feedback";
import Popup from 'reactjs-popup';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFeedbackOpen,setIsFeedbackOpen] = useState(false)
  
  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-400">
      <nav
        className="h-full max-w-screen-xl mx-auto px-4 xl:px-0 flex 
        items-center justify-center gap-2"
      >
        <div
          className={
            "relative w-full hidden lg:inline-flex lg:w-[600px] h-10 text-base text-primeColor border-[1px] border-black items-center gap-2 justify-between px-6 rounded-md" 
          }
        >
          <input
            type="text"
            placeholder="Please input the key word"
            className="flex-1 h-full outline-none bg-transparent placeholder:text-gray-600"
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
<div className="lg:inline-flex justify-end  absolute hidden lg:right-4   gap-2 h-10 ">
<div>
         

          <Popup trigger=
                { <button
                  className="setting bg-black text-white py-2 px-4 rounded-md"
                  type="button"
                  onClick={()=>setIsFeedbackOpen(!isFeedbackOpen)}
                >
                  {/* {
                    !isFeedbackOpen && <Feedback />
                  } */}
                  Feedback
                </button>} 
                modal nested>
                {
                   < Feedback/>
                }
            </Popup>
        </div>
        <div>
          <button className="feedback text-black py-2 px-4 rounded-md" type="button">
            Setting
          </button>

          
        </div>

        <div>
          <button
            type="button"
            className="profile bg-black text-white p-2 rounded-full"
          >
            Profile
          </button>
        </div>
</div>
        
      </nav>
    </div>
  );
};

export default Navbar;
