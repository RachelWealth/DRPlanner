import React from 'react';
interface Props{
    progress:number,
    children: React.ReactNode;
  className?: string;
}
const ProgressBar=({progress}:Props)=> {
  const progressBarStyle: React.CSSProperties = {
    width: `${progress}%`,
  };

  return (
    <div className="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300" style={progressBarStyle}></div>
  );
};

export default ProgressBar;
