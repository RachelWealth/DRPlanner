import mongoose from "mongoose";

const DailyPlanSchema = new mongoose.Schema({
    repeatType:{
        type:Number,
        requird:true},
    startDate:{
        type:Date,
        requird:true
    },
    endDate:{
        type:Date,
        requird:true
    },
    content:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
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

export default mongoose.model("DailyPlan",DailyPlanSchema);