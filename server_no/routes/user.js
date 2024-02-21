import express from "express";
import {verifyToken} from "../verifyToken.js";
import { updateUser,deleteUser,addDailyPlan,deleteDailyPlan } from "../controllers/user.js";


const router = express.Router();
//update a user
router.put("/:id",verifyToken,updateUser)

// //delete a user
 router.delete("/:id",verifyToken,deleteUser)

// //get a user
// router.get("/find/:id",getUser)

// //add a daily item
router.put("/daily/:userID/:id",addDailyPlan)

// //add a daily item
router.delete("/daily/:userID/:id",deleteDailyPlan)

// //add a monthly item
// router.put("/add/monthly/:id",monthlyItem)

// //add a yearly item
// router.put("/add/yearly/:id",yearlyItem)

export default router;