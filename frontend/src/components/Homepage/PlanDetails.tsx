"use client";
import nextConfig from "@/next.config.mjs";
import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/homepage.css";
import { priority, planTypes } from "../../util/config";
import {
  updateDailyPlanSuccess,
  updateDailyPlanFailed,
} from "../../redux/slices/dailySlice";
import { updateMonthlyYearlyPlanSuccess } from "@/src/redux/slices/monthlyYearlySlice";
import { Toaster, toast } from "react-hot-toast";
interface PlanDetailsProps {
  closePlanDetails: () => any;
  checkClickItem: (value: boolean, direction: string) => void;
  choicedPlanDetails: any;
}
const PlanDetails = ({
  closePlanDetails,
  choicedPlanDetails,
}: PlanDetailsProps) => {
  const { curUser } = useSelector((State: any) => State.user);
  const [planType, plan] = choicedPlanDetails;
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    plan.startDate
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    plan.endDate
  );
  const [newChange, setNewChange] = useState({});
  const env = nextConfig.publicRuntimeConfig;
  const disptach = useDispatch();
  const handleClosePlanDetails = async (
    e: React.MouseEvent<HTMLButtonElement>,
    planInfo: any
  ): Promise<void> => {
    e.preventDefault();
    if (Object.keys(newChange).length === 0) {
      return;
    }
    try {
      if (!env) {
        disptach(updateDailyPlanFailed());
        toast.error("error!");
        return;
      }
      const res = await axios.put(
        `${env.NEXT_PUBLIC_SERVER_HOST}/api/${planType.toLowerCase()}Plan/${
          curUser._id
        }/${planInfo._id}`,
        newChange
      );
      if (planType === "Daily") {
        disptach(
          updateDailyPlanSuccess({ _id: planInfo._id, newChange: newChange })
        );
      } else {
        disptach(
          updateMonthlyYearlyPlanSuccess([
            planType,
            { _id: planInfo._id, newChange: newChange },
          ])
        );
      }
    } catch (error) {
      console.log(error);
      disptach(updateDailyPlanFailed());
    }
    closePlanDetails();
  };
  if (typeof window !== "undefined") {
  return (
    <div className=" w-full h-full items-center p-5">
      <div
        id="content"
        className="flex w-full h-20 justify-start  items-center m-2 details-card"
      >
        <input
          className="flex w-full bg-transparent h-full rounded-lg font-mono text-3xl"
          type="text"
          value={plan.content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewChange((newChange) => ({
              ...newChange,
              content: e.target.value,
            }));
          }}
        />
      </div>

      <div
        id="planType"
        className="flex w-full h-15 border-2 justify-start  items-center m-2 details-card"
      >
        <h4 className="flex-none w-1/4 plan-details-title">Task Type</h4>
        <div className="flex-grow">
          <select
            name=""
            id=""
            defaultValue={planType}
            className="flex rounded-lg"
            disabled={true}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setNewChange((newChange) => ({
                // ...newChange,
                // type: e.target.value,
              }));
            }}
          >
            {planTypes.map((type: string) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div
        id="time"
        className="flex w-full h-15 border-2 justify-start  items-center m-2 details-card"
      >
        <h4 className="flex-none w-1/4  plan-details-title"> Start Date</h4>

        <DatePicker
          className=" flex rounded-lg w-1/2"
          selected={selectedStartDate}
          onChange={(date) => {
            if (date) {
              setSelectedStartDate(date);
              setNewChange((newChange) => ({
                ...newChange,
                startDate: date.toISOString(), // or whatever date format you want to use
              }));
            }
          }}
          dateFormat="dd/MM/yyyy" // Customize date format
          placeholderText="Date"
        />
        <h4 className="flex-none w-1/4  plan-details-title"> End Date</h4>
        <DatePicker
          className="flex rounded-lg w-1/2 "
          selected={selectedEndDate}
          onChange={(date) => {
            if (date) {
              setSelectedEndDate(date);
              setNewChange((newChange) => ({
                ...newChange,
                endDate: date.toISOString(), // or whatever date format you want to use
              }));
            }
          }}
          dateFormat="dd/MM/yyyy" // Customize date format
          placeholderText="Date"
        />

        <div id="endDate"></div>
      </div>

      <div
        id="repeat"
        className="details-card flex w-full h-15 border-2 justify-start  items-center m-2"
      >
        <h4 className="flex-none w-1/4 plan-details-title">Repeat Time</h4>
        <input
          type="text"
          className="flex rounded-lg w-[50px] pl-2"
          value={plan.repeatType}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewChange((newChange) => ({
              ...newChange,
              repeatType: e.target.value,
            }));
          }}
        />
      </div>

      <div
        id="priority"
        className=" details-card flex w-full h-15 border-2 justify-start  items-center m-2"
      >
        <h4 className="flex-none w-1/4  plan-details-title">Priority</h4>
        <select
          name=""
          id=""
          defaultValue={plan.priority}
          className=" flex rounded-lg"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setNewChange((newChange) => ({
              ...newChange,
              priority: e.target.value,
            }));
          }}
        >
          {priority.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div
        id="comment"
        className="details-card flex w-full h-15 border-2 justify-start  items-center m-2"
      >
        <h4 className="flex-none w-1/4  plan-details-title">Comments</h4>
        <textarea
          name=""
          id=""
          defaultValue={plan.comment}
          rows={5}
          className="w-full rounded-lg p-2"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setNewChange((newChange) => ({
              ...newChange,
              comment: e.target.value,
            }));
          }}
        ></textarea>
      </div>
      
      <div className="justify-center h-15 flex  w-full items-baseline">
        <button
          className="bg-black text-white
      border-gary-400 items-center justify-center hover:bg-gray-200 text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={(e) => {
            handleClosePlanDetails(e, plan);
          }}
        >
          Save
        </button>
      </div>

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
}
export default PlanDetails;
