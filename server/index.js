import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouters from "./routes/user.js";
import dailyPlanRouters from "./routes/dailyPlan.js";
import monthlyPlanRouters from "./routes/monthlyPlan.js";
import yearlyPlanRouters from "./routes/yearlyPlan.js";
import authRouters from "./routes/auth.js";


const app = express();
dotenv.config();

const connect = ()=>{
    console.log(process.env.MONGO)
    mongoose
    .connect(process.env.MONGO)
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        throw err;
    })
}
app.use(express.json()); // Allowed come in json data
app.use("/api/users",userRouters)
app.use("/api/dailyPlan",dailyPlanRouters)
app.use("/api/monthlyPlan",monthlyPlanRouters)
app.use("/api/yearlyPlan",yearlyPlanRouters)
app.use("/api/auth",authRouters)

app.use((err,req,res,next)=>{
    const status=err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message,
    })

})

app.listen(8800,()=>{
    connect();
    console.log("Connected to Server");
})
