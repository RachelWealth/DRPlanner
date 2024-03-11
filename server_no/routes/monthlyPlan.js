import express from "express";
import {createMonthlyPlan,deleteMonthlyPlan,updateMonthlyPlan,getMonthlyPlans } from "../controllers/monthlyPlan.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
// //create a monthly item
router.post("/create/:userID",verifyToken, createMonthlyPlan)

// get all monthly item
router.get("/:userID",verifyToken,getMonthlyPlans)

// //delete a monthly item
router.delete("/:userID/:id",verifyToken,deleteMonthlyPlan)

// //update a monthly item
router.put("/:userID/:id",verifyToken,updateMonthlyPlan)


export default router;