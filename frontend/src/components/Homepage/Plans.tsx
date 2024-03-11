"use client";
import React, { useEffect, useState } from "react";
import DailyPlans from "./DailyPlans";
import MonthlyYearlyPlans from "./MonthlyYearlyPlans";
import PlanDetails from "./PlanDetails";
import "../../styles/homepage.css";
import { CSSTransition } from "react-transition-group";
const PlansDashBoard = () => {
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [planInfo, setPlanInfo] = useState(null);
  const handleCheckClickItem = (value: boolean) => {
    console.log("click div");
    setShowPlanDetails(value);
  };
  const handleGetPlanI = (plan: any) => {
    setPlanInfo(plan);
  };


  return (
    <div className="flex h-full justify-center items-center">
      
      <div className="p-2 flex items-center bg-green-100 justify-center h-[650px] w-[800px] rounded-lg">
        <DailyPlans
          className="flex-1 p-2 m-1  bg-green-300 h-full justify-start items-center rounded-lg"
          checkClickItem={(value:boolean)=>handleCheckClickItem(value)}
          getPlanInfo={(id: string) => handleGetPlanI(id)}
        />
        <div className="flex-1 m-1 h-full justify-center items-center ">
          <MonthlyYearlyPlans
            className="flex-1 h-[50%] p-2 bg-red-200 rounded-lg justify-start "
            checkClickItem={(value: boolean) => handleCheckClickItem(value)} itemType={"Monthly"}          
          />
          <MonthlyYearlyPlans
            className="flex-1 h-[50%] p-2 bg-yellow-200 rounded-lg mt-1 justify-start"
            checkClickItem={(value:boolean)=>handleCheckClickItem(value)}
            itemType={"Yearly"}    
          
          />
        </div>
      </div>

      <CSSTransition
        in={showPlanDetails}
        out
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <div
          className={`absolute top-14 right-0 bg-orange-300 rounded-lg w-1/2 h-[650px]    ${
            showPlanDetails
              ? "slide-enter-active slide-enter"
              : "slide-leave-active slide-leave-to"
          }`}
        >
          {showPlanDetails && (
            <PlanDetails
              closePlanDetails={() => setShowPlanDetails(false)}
    
              checkClickItem={(value:boolean)=>handleCheckClickItem(value)}
          
            />
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default PlansDashBoard;
