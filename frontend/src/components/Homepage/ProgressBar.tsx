import React from 'react';
interface Props{
    progress:[number,number,number],
    children?: React.ReactNode;
  className?: string;
}
const ProgressBar=({progress}:Props)=> {
  
  const progressBarStyle: React.CSSProperties = {
    width: `${progress}%`,
  };

  return (
    <div className="flex bg-gray-600 h-2 rounded-full dark:bg-gray-300 w-full"
    >
      <div style={{ width: `${progress[0] * 100}%` }} className={`  rounded-full `} ></div>

      <div style={{ width: `${progress[1] * 100}%` }} className={`rounded-l-full bg-green-300`} ></div>
      <div style={{ width: `${progress[2] * 100}%` }} className={`  rounded-r-full bg-red-500`} ></div>
 
    </div>
     );
};

export default ProgressBar;