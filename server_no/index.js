import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouters from "./routes/user.js";
import dailyPlanRouters from "./routes/dailyPlan.js";
import monthlyPlanRouters from "./routes/monthlyPlan.js";
import yearlyPlanRouters from "./routes/yearlyPlan.js";
import authRouters from "./routes/auth.js";
import cookieParser from 'cookie-parser';


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
//connect()
import cors from 'cors';
app.use(cors({
  origin: 'http://localhost:3000', // Specify the exact origin of your frontend
  credentials: true,
}));



app.use(cookieParser());
app.use(express.json()); // Allowed come in json data
app.use("/api/users",userRouters)
app.use("/api/dailyPlan",dailyPlanRouters)
app.use("/api/monthlyPlan",monthlyPlanRouters)
app.use("/api/yearlyPlan",yearlyPlanRouters)
app.use("/api/auth",authRouters)
app.use("/",(req,res)=>{
res.status(200).send("hello world")
})
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

// import serverless from 'serverless-http';
// module.exports.handler = serverless(app)