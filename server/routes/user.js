import express from "express";
import {test} from "../controllers/user.js";

const router = express.Router();
//delete user
router.delete("/:id",deleteUser)

//get a user
router.get("/find/:id",getUser)

//add a daily item
router.put("/add/daily/:id",dailyItem)

//add a monthly item
router.put("/add/monthly/:id",monthlyItem)

//add a yearly item
router.put("/add/yearly/:id",yearlyItem)

router.get("/test",test);
export default router;