import express from "express";
import {getCompletePlans} from "../controllers/complete.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// get all complete item
router.get("/:userID",verifyToken,getCompletePlans)

export default router;