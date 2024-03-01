"use client";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDailyFailed,
  addDailyStart,
  addDailySuccess,
} from "../redux/slices/dailySlice";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { DateTime } from "luxon";
import nextConfig from "@/next.config.mjs";
interface Props {
  data?: any;
  type: string;
  onClickInsideCheckBox?: any;
}
const DailyItem = ({ data, type }: Props) => {
  const initialDaily = {
    content: null,
    priority: "Low",
  };

  if (!data) {
    data = initialDaily;
  }

  const [newContent, setNewContent] = useState(data?.content || null);
  const [newPriority, setNewPriority] = useState(data?.priority || "Low");

  const { curUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  // const [planDetail, setPlanDetail] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  const priority = ["None", "Low", "Medium", "High", "Urgent"];

  // const closePopup = () => {
  //   setPlanDetail(false);
  // };

  async function handleKeyDown(event: { key: string }): Promise<void> {
    if (event.key === "Enter") {
      console.log(event.key);
      if (!curUser) {
        toast.success(`Please Login`);
        return;
      }

      // dispatch(
      //   addDailySuccess({
      //     content: newContent,
      //     priority: newPriority,
      //   })
      // );
      const currentDate = DateTime.local();
      const formattedDate = currentDate.toFormat("yyyy-MM-dd");
      const oneDayLater = currentDate.plus({ days: 1 });
      const formattedoneDayLater = oneDayLater.toFormat("yyyy-MM-dd");
      const env = nextConfig.publicRuntimeConfig;
      try {
        if (!env) {
          return;
        }
        const response = await axios.post(
          `${env.NEXT_PUBLIC_SERVER_HOST}/api/dailyPlan/create/${curUser._id}`,
          {
            repeatType: 1,
            startDate: formattedDate,
            endDate: formattedoneDayLater,
            content: newContent,
            comment: null,
            priority: newPriority,
            state: 1,
          }
        );
        dispatch(addDailySuccess(response.data));
        setNewContent(null);
        setNewPriority("Low");
        console.log(newContent, newPriority);
        toast.success("Create succeed")
      } catch (error) {
        toast.error("Create failed")
        console.log(error);
        dispatch(addDailyFailed());
      }
    }
  }

  function setInputValue(value: string): void {
    dispatch(addDailyStart());
    setNewContent(value);
  }

  function handleChangePriority(event: ChangeEvent<HTMLSelectElement>): void {
    dispatch(addDailyStart());
    setNewPriority(event.target.value);
  }

  return (
    <div
      className={`flex h-[50px] p-1 rounded-md border-gray-300 border-2 gap-2 justify-start items-center bg-white `}
      // onClick={showPopup}
    >
      <div className="w-1/10 items-center">
        <input
          type="checkbox"
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
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <select
        className="flex-2 h-full"
        disabled={type === "li"}
        value={newPriority}
        onChange={handleChangePriority}
      >
        {Object.entries(priority).map(([value, label]) => (
          <option key={value} value={label}>
            {label}
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
