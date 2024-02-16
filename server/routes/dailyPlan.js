import express from "express";
import { } from "../controllers/dailyPlan.js";

const router = express.Router();
//create a daily item
router.post("/add/daily",createDailyItem)

//delete a daily item
router.post("delete/:id",deleteDailyItem)

//update a daily item
router.put("update/:id",updateDailyItem)

export default router;