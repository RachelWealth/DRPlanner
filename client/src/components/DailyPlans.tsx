"use client";
import React from 'react'
import Container from './Container'
import { useDispatch } from 'react-redux'
import { addDaily } from '../redux/dailySlice';
import toast from 'react-hot-toast';

const DailyPlans = () => {
  const dispatch = useDispatch()
  const plan = {
    content:"new plan",
  }
  return (
    <div>
        <h3>Daily</h3>
        <Container>
            <div className='border-black border-[5px] w-5 h-5 m-5'></div>
        <button 
        type="button" 
        className='rounded-full w-5 h-5 bg-black'
        onClick={()=>{dispatch(addDaily(plan));toast.success(
          `${plan?.content.substring(0,12)}...created`
        )

        }}>add</button>
        </Container>
    </div>
  )
}

export default DailyPlans