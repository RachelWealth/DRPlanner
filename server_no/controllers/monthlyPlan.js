import { createError } from "../error.js";
import MonthlyPlan from "../models/MonthlyPlan.js";
import axios from "axios";
import User from "../models/User.js";

export const createMonthlyPlan = async (req, res, next) => {
  try {
    const monthlyplan = new MonthlyPlan({ ...req.body });
    await monthlyplan.save();
    const planID = monthlyplan._id;
    await axios.put(
      `http://localhost:8800/api/users/monthly/${req.params.userID}/${planID}`, {
      userID: req.params.userID,
      id: planID,
    });
    console.log("monthlyplan",monthlyplan)
    res.status(200).json(monthlyplan);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

export const getMonthlyPlans = async (req, res, next) => {
  try {
    console.log("getMonthlyPlans",req);
    const user = await User.findById(req.params.userID);
    console.log(user, req.param.id);
    if (!user) {
      return res.status(404).json(createError("User not found"));
    }
    const allPlansID = await user.monthly;
    const monthlyPlans = await MonthlyPlan.find({ _id: { $in: allPlansID } });

    res.status(200).json(monthlyPlans);
  } catch (error) {
    next(error);
  }
};

export const updateMonthlyPlan = async (req, res, next) => {
  try {
    console.log(req.params.id)
    const updatedPlan = await MonthlyPlan.findByIdAndUpdate(req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPlan);
  } catch (error) {
    next(error);
  }
};

export const deleteMonthlyPlan = async (req, res, next) => {
  //console.log(req)
  try {
    const plan = await MonthlyPlan.findById(req.params.id);
    if (!plan) return next(createError(404, "Monthly plan not exists"));
    await MonthlyPlan.findByIdAndDelete(req.params.id, {
      $set: req.body,
    });
    console.log(plan);
    const planID = plan.id;
    await axios.delete(
      `http://localhost:8800/api/users/monthly/${req.params.userID}/${planID}`,
      {
        userID: req.params.userID,
        id: planID,
      }
    );
    res.status(200).json("Monthly plan has been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
