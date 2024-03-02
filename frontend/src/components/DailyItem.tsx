"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDailyStart,
  updateDailyPlanFailed,
  addDailySuccess,
  updateDailyPlanSuccess,
} from "../redux/slices/dailySlice";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { DateTime } from "luxon";
import nextConfig from "@/next.config.mjs";
import { priority, state } from "../util/config";
interface Props {
  data?: any;
  type: string;
  onClickInsideCheckBox?: any;
}
const DailyItem = ({ data, type }: Props) => {
 
  const [newContent, setNewContent] = useState(data?.content || "");
  const [newPriority, setNewPriority] = useState(data?.priority || priority[0]);
  const { curUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const env = nextConfig.publicRuntimeConfig;
  async function handleKeyDown(event: { key: string }): Promise<void> {
    if (event.key === "Enter") {
      console.log(event.key);
      if (!curUser) {
        toast.error(`Please Login`);
        return;
      }
      dispatch(addDailyStart());
      const currentDate = DateTime.local();
      const formattedDate = currentDate.toFormat("yyyy-MM-dd");
      const oneDayLater = currentDate.plus({ days: 1 });
      const formattedoneDayLater = oneDayLater.toFormat("yyyy-MM-dd");
     

      try {
        if (!env) {
          return;
        }
        const newPlan = {
          repeatType: 1,
          startDate: formattedDate,
          endDate: formattedoneDayLater,
          content: newContent,
          comment: "",
          priority: newPriority,
          state: state[1],
        };
        const response = await axios.post(
          `${env.NEXT_PUBLIC_SERVER_HOST}/api/dailyPlan/create/${curUser._id}`,
          newPlan
        );
        dispatch(addDailySuccess(newPlan));
        setNewContent("");
        setNewPriority(priority[0]);
      } catch (error) {
        console.log(error);
        dispatch(updateDailyPlanFailed());
      }
    }
  }

  function handleSetContent(value: string): void {
    setNewContent(value);
  }

  function handleChangePriority(event: ChangeEvent<HTMLSelectElement>): void {
    setNewPriority(event.target.value);
  }
  async function handleClick():Promise<void>{
    try {
      console.log("complete")
      if(!env){
        toast.error("Update failed!")
        return ;
      }
      const newPlan =  {_id:data._id,newChange:{state:state[2]}}
      const response = await axios.put(`${env.NEXT_PUBLIC_SERVER_HOST}/api/dailyPlan/create/${curUser._id}/${data._id}`,
      newPlan
    );
    dispatch(updateDailyPlanSuccess(newPlan))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`flex h-[50px] p-1 rounded-md border-gray-300 border-2 gap-2 justify-start items-center bg-white `}
      // onClick={showPopup}
    >
      <div className="w-1/10 items-center">
        <input
          type="checkbox"
          onClick={handleClick}
          id="green-checkbox"
          className="bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <input
        type="text"
        disabled={type === "li"}
        placeholder="Example: Write thesis by 7 PM"
        value={newContent}
        className="w-2/3 h-full mx-1"
        onChange={(e) => handleSetContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <select
        className="flex-2 h-full"
        disabled={type === "li"}
        value={newPriority}
        onChange={handleChangePriority}
      >
        {priority.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <Toaster
        position="bottom-center"
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "#fffff",
            },
          },
          error: {
            style: {
              background: "red",
              color: "#000000",
            },
          },
        }}
      />
    </div>
  );
};

export default DailyItem;
