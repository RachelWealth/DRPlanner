"use client";
import React, { useEffect, useState } from 'react'
import Container from './Container'
import { useDispatch, useSelector } from 'react-redux'
import { addDailyStart,addDailySuccess,addDailyFailed } from '../redux/slices/dailySlice';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { start } from 'repl';
interface Props{
  className:String;
}
const DailyPlans = ({className}:Props) => {
  const dispatch = useDispatch()
  axios.defaults.withCredentials = true;
  const plan = {
    content:"new plan",
  }
  const {curUser} = useSelector((state: any) =>state.user)
  const [plans,setPlans] = useState([])
  useEffect(()=>{
    const fetchPlans = async()=>{
      console.log("fetch daily plans")
      if(curUser){
        const res = await axios.get(`http://localhost:8800/api/dailyPlan/${curUser._id}`);
      setPlans(res.data)
      console.log(res)
      }

      
    }
    fetchPlans()
  },[curUser])
  const handleAddDailiPlan=()=>{
dispatch(addDailyStart())
    const fetchPlans = async()=>{
      console.log("add daily plans")
      try{
        if(curUser){
          const res = await axios.get(`http://localhost:8800/api/dailyPlan/${curUser._id}`);
        setPlans(res.data)
        console.log(res)
        toast.success(
          `${plan?.content.substring(0,12)}...created`
        )}
      }catch(error){
        toast.error(
          `${plan?.content.substring(0,12)}...created failed`
        )
      }
      
      }
    
    fetchPlans()

  }
  return (
    <div className={`${className}`}>
        <h3>Daily</h3>
        <Container>
          {plans.map(plan=>(
            <p>plan</p>
          ))}
            <div className='border-black border-[5px] w-5 h-5 m-5'></div>
           
        <button 
        type="button" 
        className='rounded-full w-5 h-5 bg-black'
        onClick={() => handleAddDailiPlan()}
        >
        add
        </button>
        </Container>
        <Toaster
        position='bottom-center'
        toastOptions={
          {
            success:{
              style:{
                background:'green',
                color:"#fffff",
              }
            },
            error:{
              style:{
                background:'red',
                color:"#000000",
              }
            }
          }

          
        }
        
        />
    </div>
  )
}

export default DailyPlans