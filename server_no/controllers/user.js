import { createError } from "../error.js"
import User from "../models/User.js";

export const updateUser = async (req,res,next)=>{
    if(req.params.userID === req.body._id){  
              try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userID,{
                $set: req.body
            },{new:true}
            )
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }else{
        return next(createError(403,"You can only update your account!"))
    }
}

export const deleteUser = async(req,res,next)=>{
    if(req.params.id === req.body._id){
        try {
            await User.findByIdAndDelete(req.params.id,{
                $set: req.body
            }//,{new:true}
            )
            res.status(200).json("User has been deleted")
        } catch (error) {
            next(error)
        }
    }else{
        return next(createError(403,"You can only update your account!"))
    }
}

export const getUser =async (req,res,next)=>{
    
}

export const addDailyPlan = async (req, res, next) => {
    try {
        console.log("addDailyPlan",req.params);
        await User.findByIdAndUpdate(req.params.userID, {
            $push: { daily: req.params.id }
        });

        console.log("Added daily item to user");
        
        res.status(200).json("New daily item added");
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
        // Use "error.message" to get the specific error message from the exception
    }
};

export const addMonthlyPlan = async (req, res, next) => {
    try {
        console.log("addMontlyPlan",req.params);
        await User.findByIdAndUpdate(req.params.userID, {
            $push: { monthly: req.params.id }
        });

        console.log("Added Montly item to user");
        
        res.status(200).json("New Montly item added");
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
        // Use "error.message" to get the specific error message from the exception
    }
};

export const addYearlyPlan = async (req, res, next) => {
    try {
        console.log("addYearlyPlan",req.params);
        await User.findByIdAndUpdate(req.params.userID, {
            $push: { yearly: req.params.id }
        });

        console.log("Added daily item to user");
        
        res.status(200).json("New daily item added");
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
        // Use "error.message" to get the specific error message from the exception
    }
};



export const deleteDailyPlan = async(req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.params.userID,{
            $pull:{daily:req.params.id} // remove an element from the array
        })
        // await User.findOneAndUpdate(req.params.id,{
        //     $inc:{dailyPlan:-1}
        // })
        res.status(200).json("New daily Item added")
    } catch (error) {
        next(error)
    }
}


export const monthlyItem = async(req,res,next)=>{
    
}

export const yearlyItem = async(req,res,next)=>{
    
}


