import React from 'react';
import DailyPlans from './DailyPlans';
import MonthlyPlans from './MonthlyPlans';
import YearlyPlans from './YearlyPlans';

const PlansDashBoard = () => {
  return (
    <div className='flex justify-center items-center '> 

<div className='p-2 m-2 flex items-center justify-center h-[600px] w-[800px] border-gray-600 border-2'>
      <DailyPlans className="flex-1 p-2 m-1 h-full justify-start items-center border-2 border-gray-500" />
      <div className="flex-1 m-1 h-full justify-center items-center border-2 border-gray-500" >
      <MonthlyPlans className="flex h-[50%] p-2  justify-start border-2 border-gray-500" ></MonthlyPlans>
      <YearlyPlans className="flex h-[50%] p-2 mt-1 justify-start border-2 border-gray-500" ></YearlyPlans>
      </div>
    </div>
    </div>

    
  );
};

export default PlansDashBoard;
