"use client";
import React, { useEffect } from "react";
import Container from "./../Homepage/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  initialMonthlyYearly,
} from "../../redux/slices/monthlyYearlySlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import MonthYearlyItem from "./MonthlyYearlyItem";
import "../../styles/homepage.css"
import nextConfig from "@/next.config.mjs";
import { firstFetchFailed, firstFetchSuccess } from "../../redux/slices/userSlice";
import { DateTime } from "luxon";
interface Props {
  className: String;
  checkClickItem:(value:boolean)=>void;
  itemType:String;
}
import { state } from "../../util/config";

const MonthlyYearlyPlans = ({ className,checkClickItem, itemType }: Props) => {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
 
  const { curUser } = useSelector((state: any) => state.user);
  let allMY:any=[]
  if(itemType==="Monthly"){
    const { allMonthlyData } = useSelector((state: any) => state.monthlyYearly);
     allMY = allMonthlyData
  }
  else{
     const { allYearlyData } = useSelector((state: any) => state.monthlyYearly);
     allMY = allYearlyData
  }
  
  //const { firstFetchMonthlyYearlyPlans } = useSelector((state: any) => state.user);
  
  useEffect(() => {
      const env = nextConfig.publicRuntimeConfig
      try {
        const fetchPlans = async () => {
          console.log("fetch monthly plans");
          if(!env)  return ;
          
          if (curUser) {
            const res = await axios.get(
              `${env.NEXT_PUBLIC_SERVER_HOST}/api/${itemType.toLowerCase()}Plan/${curUser._id}`
            );
            console.log(res);
            dispatch(firstFetchSuccess());
            dispatch(initialMonthlyYearly([itemType,res.data]));
          }
        };
        fetchPlans();
      } catch (error) {
        console.log(error);
        dispatch(firstFetchFailed());
      }
  }, []);

  function handleClickli(plan: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={`${className}`}>
      <h3 className="font-bold">{itemType}</h3>
      <Container 
      className="flex flex-col  ">
        <ul className="overflow-y-auto flex-1 list-none scrollbar-hide mb-2">
          {Array.isArray(allMY) &&
            allMY
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
                  <MonthYearlyItem data={plan} type="li" itemType={itemType} />
                </li>
              ))}
        </ul>

        <div id="addNewMonthlyYearly" className="bg-white  rounded-md shadow-md mt-auto p-1">
        <MonthYearlyItem type={"uni"}  itemType={itemType}/>

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

export default MonthlyYearlyPlans;