import express from "express";
import {} from "../controllers/monthlyPlan.js";

const router = express.Router();

// //create a daily item
router.post("/create/:userID",verifyToken, createMonthlyPlan)

// get all daily item
router.get("/:userID",verifyToken,getMonthlyPlans)

// //delete a daily item
router.delete("/:userID/:id",verifyToken,deleteMonthlyPlan)

// //update a daily item
router.put("/:id",verifyToken,updateMonthlyPlan)

export default router;