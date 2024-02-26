"use client";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDailyFailed, addDailyStart, addDailySuccess } from "../redux/slices/dailySlice";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { DateTime } from "luxon";
import ProgressBar from "./ProgressBar";
import { proBarCalculate } from "../util/proBarCaculate";
interface Props {
  type:String,
  data?: any;
}
const MonthlyYearlyItem = ({ type,data }: Props) => {
  const initialDaily={
    content: null,
    priority: "Low",
  }
  if (!data) {
    data = initialDaily
  }
  
  const [newContent, setNewContent] = useState(data.content);
  const [newPriority, setNewPriority] = useState(data.priority);
  const {curUser} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const priority = ["None", "Low", "Medium", "High", "Urgent"];
  
  async function handleKeyDown(event: { key: string; }): Promise<void> {
    if (event.key === 'Enter'){
      console.log(event.key)
      if (!curUser) {
        toast.success(`Please Login`);
        return;
      }
    
    
    dispatch(
      addDailySuccess({
        content: newContent,
        priority: newPriority,
      })
    );
    const currentDate = DateTime.now();
    const formattedDate = currentDate.toFormat('yyyy-MM-dd');
    
    try {
      const response = await axios.post(
        `http://localhost:8800/api/${type}/create/${curUser._id}`,
        {
          repeatType: 1,
          startDate: formattedDate,
          endDate: formattedDate,
          content: newContent,
          comment: null,
          priority: newPriority,
          state: 1,
        }
      );
      dispatch(addDailySuccess(response.data))
      setNewContent(initialDaily.content)
      setNewPriority(initialDaily.priority)
    } catch (error) {
      console.log(error)
      dispatch(addDailyFailed())
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
    <div><div className=" flex h-[30px] rounded-md gap-2 justify-start items-center bg-white">
    <div className="w-1/10 items-center "><input
      type="checkbox"
      id="green-checkbox"
      className="  text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    /></div>
    
    <input
      type="text"
      placeholder="Example: Write thesis by 7 PM"
      defaultValue={newContent}
      className="w-2/3 h-full mx-1"
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />

    <select
  
      defaultValue={newPriority}
      className="flex-2 h-full"
      onChange={handleChangePriority}
    >
      {Object.entries(priority).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
  <ProgressBar progress={proBarCalculate(data)} >

  </ProgressBar></div>
    
  );
};

export default MonthlyYearlyItem;


