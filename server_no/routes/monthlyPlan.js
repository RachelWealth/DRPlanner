import express from "express";
import {createMonthlyPlan,deleteMonthlyPlan,updateMonthlyPlan,getMonthlyPlans } from "../controllers/monthlyPlan.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// //create a daily item
router.post("/create/:userID",verifyToken, createMonthlyPlan)

// get all daily item
router.get("/:userID",verifyToken,getMonthlyPlans)

// //delete a daily item
router.delete("/:userID/:id",verifyToken,deleteMonthlyPlan)

// //update a daily item
router.put("/:userID/:id",verifyToken,updateMonthlyPlan)

export default router;