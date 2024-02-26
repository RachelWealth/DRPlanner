import { createError } from "../error.js"
import DailyPlan from "../models/DailyPlan.js"
import axios from "axios"
import User from "../models/user.js";

export const createDailyPlan = async(req,res,next)=>{
    try {
        const dailyplan = new DailyPlan({...req.body})
        await dailyplan.save()
        const planID = dailyplan._id
        await axios.put(`http://localhost:8800/api/users/daily/${req.params.userID}/${planID}`,{
            userID:req.params.userID,
            id:planID
        })
        res.status(200).json("Daily plan created")
    } catch (error) {
        next(error)
    }
}

export const getDailyPlans = async(req,res,next)=>{
    try {
        console.log(req)
        const user = await User.findById(req.params.userID)
        console.log(user,req.param.id)
        if(!user){
            return res.status(404).json(createError("User not found"))
        }
        const allPlansID = await user.daily;
        const dailyPlans = await DailyPlan.find({_id:{$in:allPlansID}})
       
        res.status(200).json(dailyPlans)
    } catch (error) {
        next(error)
    }
}


export const updateDailyPlan =async(req,res,next)=>{
    if(req.params.id===req.dailyPlan.id){
        try {
            const updatedPlan = await DailyPlan.findByIdAndUpdate({
                $set:req.body
            },{new:true}
            )
            res.status(200).json(updatedPlan)
        } catch (error) {
            next(error)
        }
    }
    //if is compelete
}

export const deleteDailyPlan =async(req,res,next)=>{
    //console.log(req)
        try {
            const plan = await DailyPlan.findById(req.params.id)   
            if(!plan) return next(createError(404,"Daily plan not exists")) 
            await DailyPlan.findByIdAndDelete(req.params.id,{
                    $set: req.body
            })
            console.log(plan)
            const planID = plan.id
            await axios.delete(`http://localhost:8800/api/users/daily/${req.params.userID}/${planID}`,{
                userID:req.params.userID,
                id:planID
            })
            res.status(200).json("Daily plan has been deleted")
            
        } catch (error) {
            console.error(error);
        res.status(500).json({ success: false, error: error.message });
        }
    
}

