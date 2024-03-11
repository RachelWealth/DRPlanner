"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import {
  initialDaily,
  updateDailyPlanStart,
} from "../../redux/slices/dailySlice";
import dotenv from "dotenv";
dotenv.config();
import toast,{ Toaster } from "react-hot-toast";
import axios from "axios";
import DailyItem from "./DailyItem";
import { firstFetchFailed, firstFetchSuccess } from "../../redux/slices/userSlice";
import "../../styles/homepage.css";
interface Props {
  className: String;
  checkClickItem: (value: boolean) => void;
  getPlanInfo?: (planInfo: any) => void;
}
import nextConfig from "../../../next.config.mjs";
import { DateTime } from "luxon";
import { state } from "../../util/config";

const DailyPlans = ({ className, checkClickItem }: Props) => {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  const { allDailyData } = useSelector((state: any) => state.daily);
  
  const { curUser } = useSelector((state: any) => state.user);
 
  const { needFirstFetchDailyPlans } = useSelector((state: any) => state.user);
  const handleCheckClickItem = (id: String) => {
    for (const plan in allDailyData) {
      if (allDailyData[plan]._id === id) {
        return allDailyData[plan];
      }
    }
    //getPlanInfo(allDailyData.find(function(item:any) {return item._id === id}))
  };
  const handleClickli = (plan: any) => {
    dispatch(updateDailyPlanStart(handleCheckClickItem(plan._id)));
    checkClickItem(true);
  };
  useEffect(() => {
    if (needFirstFetchDailyPlans) {
      try {
        const env = nextConfig.publicRuntimeConfig;
        const fetchPlans = async () => {
          if (curUser && env) {
            console.log("fetch daily plans");
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
    }
  }, [curUser]);

  return (
    <div className={`${className}`}>
      <h3 className="font-bold">Daily</h3>
      <Container className="flex flex-col  ">
        <ul className="overflow-y-auto flex-1 list-none scrollbar-hide mb-2">
          {Array.isArray(allDailyData) &&
            allDailyData
              .filter((plan) => {
                const currentDate = DateTime.local();
                const endDate =  DateTime.fromISO(plan.endDate);

                return currentDate <= endDate && plan.state!=state[2];
              })
              .map((plan: any) => (
                <li
                  onClick={() => handleClickli(plan)}
                  key={plan._id}
                  className="hover:bg-gray-200 bg-white p-4 mb-2 rounded-md shadow-md"
                >
                  <DailyItem data={plan} type="li" />
                </li>
              ))}
        </ul>

        <div
          id="addNewDaily"
          className="bg-white  rounded-md shadow-md mt-auto p-2"
        >
          <DailyItem type="uni" />
        </div>
        <div className="block"></div>
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
