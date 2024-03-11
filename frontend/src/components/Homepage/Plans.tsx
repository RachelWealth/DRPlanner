"use client";
import React, { useEffect, useRef, useState } from "react";
import DailyPlans from "./DailyPlans";
import MonthlyYearlyPlans from "./MonthlyYearlyPlans";
import PlanDetails from "./PlanDetails";
import "../../styles/homepage.css";
import { CSSTransition } from "react-transition-group";
import { motion, AnimatePresence } from "framer-motion";
const PlansDashBoard = () => {
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [slideInDirection, setSlideInDirection] = useState("right");
  const [planInfo, setPlanInfo] = useState(null);
  const handleCheckClickItem = (
    value: boolean,
    direction: string,
    plan: any
  ) => {
    setShowPlanDetails(value);
    setSlideInDirection(direction);
    setPlanInfo(plan);
  };

  const componentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      setShowPlanDetails(false);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) =>
      handleClickOutside(event);

    if (showPlanDetails) {
      document.addEventListener("mousedown", handleDocumentClick);
    } else {
      document.removeEventListener("mousedown", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [showPlanDetails]);
  return (
    <div className="flex h-full justify-center items-center">
      <div className="p-2 flex items-center bg-green-100 justify-center h-[650px] w-[800px] rounded-lg">
        <DailyPlans
          className="flex-1 p-2 m-1  bg-green-300 h-full justify-start items-center rounded-lg"
          checkClickItem={(value: boolean, direction: string, plan: any) =>
            handleCheckClickItem(value, direction, plan)
          }
          //getPlanInfo={(id: string) => handleGetPlanI(id)}
        />
        <div className="flex-1 m-1 h-full justify-center items-center ">
          <MonthlyYearlyPlans
            className="flex-1 h-[50%] p-2 bg-red-200 rounded-lg justify-start "
            checkClickItem={(value: boolean, direction: string, plan: any) =>
              handleCheckClickItem(value, direction, plan)
            }
            itemType={"Monthly"}
            //getPlanInfo={(id: string) => handleGetPlanI(id)}
          />
          <MonthlyYearlyPlans
            className="flex-1 h-[50%] p-2 bg-yellow-200 rounded-lg mt-1 justify-start"
            checkClickItem={(value: boolean, direction: string, plan: any) =>
              handleCheckClickItem(value, direction, plan)
            }
            itemType={"Yearly"}
            // getPlanInfo={(id: string) => handleGetPlanI(id)}
          />
        </div>
      </div>
      {/* {showPlanDetails && ( */}
      <AnimatePresence>
        {showPlanDetails && (
          <motion.div
            key="plan-details"
            initial={{
              opacity: 0,
              x: slideInDirection === "right" ? "100%" : "-100%", // Adjust based on slideInDirection
            }}
            exit={{
              opacity: 0,
              x: slideInDirection === "right" ? "100%" : "-100%", // Adjust based on slideInDirection
            }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: showPlanDetails ? "block" : "none" }}
            transition={{ duration: 1 }}
            className={`absolute top-14 ${
              slideInDirection === "right" ? "right-0" : "left-0"
            } bg-orange-300 rounded-lg w-1/2 h-[650px]`}
            ref={componentRef}
          >
            <PlanDetails
              choicedPlanDetails={planInfo}
              closePlanDetails={() => setShowPlanDetails(false)}
              checkClickItem={(value: boolean, direction: string) =>
                handleCheckClickItem(value, direction, planInfo)
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* )} */}
    </div>
  );
};

export default PlansDashBoard;
