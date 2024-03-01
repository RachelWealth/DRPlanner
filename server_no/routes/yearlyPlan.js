import express from "express";
import {createYearlyPlan,deleteYearlyPlan,updateYearlyPlan,getYearlyPlans } from "../controllers/yearlyPlan.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
// //create a yearly item
router.post("/create/:userID",verifyToken, createYearlyPlan)

// get all yearly item
router.get("/:userID",verifyToken,getYearlyPlans)

// //delete a yearly item
router.delete("/:userID/:id",verifyToken,deleteYearlyPlan)

// //update a yearly item
router.put("/:userID/:id",verifyToken,updateYearlyPlan)



export default router;