import nextConfig from "@/next.config.mjs";
import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import "../styles/homepage.css";
import {
  updateDailyPlanSuccess,
  updateDailyPlanFailed,
} from "../redux/slices/dailySlice";
import { Toaster, toast } from "react-hot-toast";
interface PlanDetailsProps {
  closePlanDetails: () => any;
  checkClickItem: (value: boolean) => void;
}
const PlanDetails = ({
  closePlanDetails,
  checkClickItem,
}: PlanDetailsProps) => {
  const { choicedPlanDetails } = useSelector((State: any) => State.daily);

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    choicedPlanDetails.startDate
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    choicedPlanDetails.endDate
  );

  const [newChange, setNewChange] = useState({});
  const env = nextConfig.publicRuntimeConfig;
  const disptach = useDispatch();
  const priority = ["None", "Low", "Medium", "High", "Urgent"];
  const handleClosePlanDetails = async (
    e: React.MouseEvent<HTMLButtonElement>,
    planInfo: any
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (!env) {
        disptach(updateDailyPlanFailed());
        toast.error("error!");
        return;
      }
      const res = await axios.put(
        `${env.NEXT_PUBLIC_SERVER_HOST}/api/${planInfo._id}`,
        { newChange }
      );
      disptach(updateDailyPlanSuccess(res.data));
    } catch (error) {
      console.log(error);
      disptach(updateDailyPlanFailed());
    }
    closePlanDetails();
  };

  return (
    <div className=" w-full h-full items-center p-5">
      <div
        id="content"
        className="flex w-full h-20 border-2 justify-start  items-center m-2"
      >
        <input
          className="flex w-full bg-transparent h-full rounded-lg font-mono text-3xl"
          type="text"
          value={choicedPlanDetails.content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewChange((newChange) => ({
              ...newChange,
              type: e.target.value,
            }));
          }}
        />
      </div>

      <div
        id="planType"
        className="flex w-full h-15 border-2 justify-start  items-center m-2"
      >
        <h4 className="flex-none w-1/4 plan-details-title">Task Type</h4>
        <div className="flex-grow">
          <select
            name=""
            id=""
            value={choicedPlanDetails.type}
            className="flex rounded-lg"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setNewChange((newChange) => ({
                ...newChange,
                type: e.target.value,
              }));
            }}
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="complete">Complete</option>
            <option value="brainstorm">Brainstorm</option>
          </select>
        </div>
      </div>

      <div
        id="time"
        className="flex w-full h-15 border-2 justify-start  items-center m-2"
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
                type: date.toISOString(), // or whatever date format you want to use
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
                type: date.toISOString(), // or whatever date format you want to use
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
        className="flex w-full h-15 border-2 justify-start  items-center m-2"
      >
        <h4 className="flex-none w-1/4 plan-details-title">Repeat Time</h4>
        <input
          type="text"
          className="flex rounded-lg w-[50px] pl-2"
          value={choicedPlanDetails.repeatType}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewChange((newChange) => ({
              ...newChange,
              repeat: e.target.value,
            }));
          }}
        />
      </div>

      <div
        id="priority"
        className="flex w-full h-15 border-2 justify-start  items-center m-2"
      >
        <h4 className="flex-none w-1/4  plan-details-title">Priority</h4>
        <select
          name=""
          id=""
          value={choicedPlanDetails.priority}
          className=" flex rounded-lg"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setNewChange((newChange) => ({
              ...newChange,
              type: e.target.value,
            }));
          }}
        >
          {Object.entries(priority).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div
        id="comment"
        className="flex w-full h-15 border-2 justify-start  items-center m-2"
      >
        <h4 className="flex-none w-1/4  plan-details-title">Comments</h4>
        <textarea
          name=""
          id=""
          value={choicedPlanDetails.comment}
          rows={5}
          className="w-full rounded-lg p-2"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setNewChange((newChange) => ({
              ...newChange,
              repeat: e.target.value,
            }));
          }}
        ></textarea>
      </div>
      <div
        id="addFile"
        className="flex w-full border-2 justify-start  items-center m-2"
      ></div>
      <div className="justify-center h-15 flex  w-full items-baseline">
        <button
          className="bg-black text-white
      border-gary-400 items-center justify-center hover:bg-gray-200 text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={(e) => {
            handleClosePlanDetails(e, choicedPlanDetails);
            checkClickItem(false);
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

export default PlanDetails;
