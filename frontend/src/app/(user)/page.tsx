"use client"
import PlansDashBoard from '@/src/components/Plans'
import SidebarWithBurgerMenu from '@/src/components/Sidebar'
import React from 'react'

const HomePage = () => {
  return (
    
    <div className=''>
       <div className="absolute top-0 left-0 h-full ">
        <SidebarWithBurgerMenu />
      </div>
 <PlansDashBoard ></PlansDashBoard>
    </div>
   
    
  )
}

export default HomePage