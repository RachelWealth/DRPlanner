import express from "express";
import {createDailyPlan,deleteDailyPlan,updateDailyPlan,getDailyPlans } from "../controllers/dailyPlan.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
// //create a daily item
router.post("/create/:userID",verifyToken, createDailyPlan)

// get all daily item
router.get("/:userID",verifyToken,getDailyPlans)

// //delete a daily item
router.delete("/:userID/:id",verifyToken,deleteDailyPlan)

// //update a daily item
router.put("/:id",verifyToken,updateDailyPlan)



export default router;