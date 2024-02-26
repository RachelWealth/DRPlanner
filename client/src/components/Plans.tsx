import React from 'react';
import DailyPlans from './DailyPlans';
import MonthlyPlans from './MonthlyPlans';
import YearlyPlans from './YearlyPlans';

const PlansDashBoard = () => {
  return (
    <div className='flex h-full justify-center items-center '> 

<div className='p-2 m-2 flex items-center bg-green-100 justify-center h-[650px] w-[800px] rounded-lg'>
      <DailyPlans className="flex-1 p-2 m-1  bg-green-300 h-full justify-start items-center rounded-lg" />
      <div className="flex-1 m-1 h-full justify-center items-center " >
      <MonthlyPlans className="flex-1 h-[50%] p-2 bg-red-200 rounded-lg justify-start " ></MonthlyPlans>
      <YearlyPlans className="flex-1 h-[50%] p-2 bg-yellow-200 rounded-lg mt-1 justify-start" ></YearlyPlans>
      </div>
    </div>
    </div>

    
  );
};

export default PlansDashBoard;
