import mongoose from "mongoose";

const DailyPlanSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true,
    },
    repeatType:{
        type:Number,
        requird:true},
    startDate:{
        type:Number,
        requird:true
    },
    endDate:{
        type:Number,
        requird:true
    },
    content:{
        type:String,
        required:true,
    },
    comment:{
        type:Number,
        requird:true,
    },
    importance:{
        type:Number,
        requird:true,
    },
    state:{
        type:Number,
        required:true, //0-not start 1-pending 2-finished
    },
},
{timestamps: true});


export default mongoose.model("yearlyPlan",YearlyPlan);