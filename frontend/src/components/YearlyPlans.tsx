"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addDailyStart,
  addDailySuccess,
  addDailyFailed,
  initialDaily,
} from "../redux/slices/dailySlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import YearlyItem from "./MonthlyYearlyItem";
import "../styles/homepage.css"
import nextConfig from "@/next.config.mjs";
import { firstFetchFailed, firstFetchSuccess } from "../redux/slices/userSlice";
interface Props {
  className: String;
  checkClickItem:(value:boolean)=>void;
}
const DailyPlans = ({ className,checkClickItem }: Props) => {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  const newPlan = {
    content: "new plan",
  };
  const { curUser } = useSelector((state: any) => state.user);
  const { allDailyData,newDailyPlan } = useSelector((State: any) => State.daily);
  const { firstFetchDailyPlans } = useSelector((state: any) => state.user);
  useEffect(() => {
    if (firstFetchDailyPlans) {
      const env = nextConfig.publicRuntimeConfig
      try {
        const fetchPlans = async () => {
          console.log("fetch yearly plans");
          if(!env)  return ;
          
          if (curUser) {
            const res = await axios.get(
              `${env.NEXT_PUBLIC_SERVER_HOST}/api/dailyPlan/${curUser._id}`
            );
            console.log(res);
            dispatch(firstFetchSuccess());
            dispatch(initialDaily(res.data));
          }
        };
        fetchPlans();
      } catch (error) {
        console.log(error);
        dispatch(firstFetchFailed());
      }

      return;
    }
  }, [newDailyPlan,curUser]);

  return (
    <div className={`${className}`}>
      <h3 className="font-bold">Yearly</h3>
      <Container 
      className="flex flex-col  ">
        <ul className="overflow-y-auto flex-1 list-none scrollbar-hide mb-2">
          {Array.isArray(allDailyData) &&
            allDailyData.map((plan: any) => (
              <li
                // key={plan._id}
                className="bg-white p-4 mb-2 rounded-md shadow-md"
              >
                <YearlyItem data={plan} type={"li"} />
              </li>
            ))}
        </ul>

        <div id="addNewDaily" className="bg-white  rounded-md shadow-md mt-auto p-1">
        <YearlyItem type={"uni"} />

        </div>
      </Container>
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

export default DailyPlans;