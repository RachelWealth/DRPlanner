import { createError } from "../error.js";
import YearlyPlan from "../models/YearlyPlan.js";
import axios from "axios";
import User from "../models/User.js";

export const createYearlyPlan = async (req, res, next) => {
  try {
    const yearlyplan = new YearlyPlan({ ...req.body });
    await yearlyplan.save();
    const planID = yearlyplan._id;
    await axios.put(`/api/users/yearly/${req.params.userID}/${planID}`, {
      userID: req.params.userID,
      id: planID,
    });
    res.status(200).json("Yearly plan created");
  } catch (error) {
    next(error);
  }
};

export const getYearlyPlans = async (req, res, next) => {
  try {
    console.log(req);
    const user = await User.findById(req.params.userID);
    console.log(user, req.param.id);
    if (!user) {
      return res.status(404).json(createError("User not found"));
    }
    const allPlansID = await user.yearly;
    const yearlyPlans = await YearlyPlan.find({ _id: { $in: allPlansID } });

    res.status(200).json(yearlyPlans);
  } catch (error) {
    next(error);
  }
};

export const updateYearlyPlan = async (req, res, next) => {
  try {
    console.log(req.params.id)
    const updatedPlan = await YearlyPlan.findByIdAndUpdate(req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPlan);
  } catch (error) {
    next(error);
  }

  //if is compelete
};

export const deleteYearlyPlan = async (req, res, next) => {
  //console.log(req)
  try {
    const plan = await YearlyPlan.findById(req.params.id);
    if (!plan) return next(createError(404, "Yearly plan not exists"));
    await YearlyPlan.findByIdAndDelete(req.params.id, {
      $set: req.body,
    });
    console.log(plan);
    const planID = plan.id;
    await axios.delete(
      `http://localhost:8800/api/users/yearly/${req.params.userID}/${planID}`,
      {
        userID: req.params.userID,
        id: planID,
      }
    );
    res.status(200).json("Yearly plan has been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
