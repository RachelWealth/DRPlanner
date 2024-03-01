"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addMonthlyStart,
  addMonthlySuccess,
  addMonthlyFailed,
  initialMonthly,
} from "../redux/slices/monthlySlice";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import MonthlyItem from "./MonthlyYearlyItem";
import "../styles/homepage.css"
import nextConfig from "@/next.config.mjs";
import { firstFetchFailed, firstFetchSuccess } from "../redux/slices/userSlice";
interface Props {
  className: String;
  checkClickItem:(value:boolean)=>void;
}
const MonthlyPlans = ({ className,checkClickItem }: Props) => {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  const newPlan = {
    content: "new plan",
  };
  const { curUser } = useSelector((state: any) => state.user);
  const { allMonthlyData,newMonthlyPlan } = useSelector((State: any) => State.monthly);
  const { firstFetchMonthlyPlans } = useSelector((state: any) => state.user);
  useEffect(() => {
    if (firstFetchMonthlyPlans) {
      const env = nextConfig.publicRuntimeConfig
      try {
        if(!env){
          return ;
        }
        const fetchPlans = async () => {
          console.log("fetch Monthly plans");
          if (curUser) {
            const res = await axios.get(
              `${env.NEXT_PUBLIC_SERVER_HOST}/api/monthlyPlan/${curUser._id}`
            );
            console.log(res);
            dispatch(firstFetchSuccess());
            dispatch(initialMonthly(res.data));
          }
        };
        fetchPlans();
      } catch (error) {
        console.log(error);
        dispatch(firstFetchFailed());
      }

      return;
    }
  }, [newMonthlyPlan,curUser]);

  return (
    <div className={`${className}`}>
      <h3 className="font-bold">Monthly</h3>
      <Container 
      className="flex flex-col  ">
        <ul className="overflow-y-auto flex-1 list-none scrollbar-hide mb-2">
          {allMonthlyData &&
            allMonthlyData.map((plan: any) => (
             
              <li
                // key={plan._id}
                className="bg-white p-4 mb-2 rounded-md shadow-md"
              >
                
                <MonthlyItem data={plan} type="li"/>
              </li>
            ))}
        </ul>

        <div id="addNewMonthly" className="bg-white  rounded-md shadow-md mt-auto p-1">
        
        <MonthlyItem type="uni"/>

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

export default MonthlyPlans;