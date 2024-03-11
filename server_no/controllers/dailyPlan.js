import { createError } from "../error.js";
import DailyPlan from "../models/DailyPlan.js";
import axios from "axios";
import User from "../models/User.js";

export const createDailyPlan = async (req, res, next) => {
  try {
    const dailyplan = new DailyPlan({ ...req.body });
    await dailyplan.save();
    const planID = dailyplan._id;
    await axios.put(
      `http://localhost:8800/api/users/daily/${req.params.userID}/${planID}`,
      {
        userID: req.params.userID,
        id: planID,
      }
    );
    console.log("dailyplan", dailyplan);
    res.status(200).json(dailyplan);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getDailyPlans = async (req, res, next) => {
  try {
    console.log(req);
    const user = await User.findById(req.params.userID);
    if (!user) {
      return res.status(404).json(createError("User not found"));
    }
    const allPlansID = await user.daily;
    const dailyPlans = await DailyPlan.find({ _id: { $in: allPlansID } });

    res.status(200).json(dailyPlans);
  } catch (error) {
    next(error);
  }
};

export const get7DailyPlans = async (req, res, next) => {
  try {
    console.log(req);
    const user = await User.findById(req.params.userID);
    if (!user) {
      return res.status(404).json(createError("User not found"));
    }
    const allPlansID = await user.daily;

    const currentDate = new Date();

    // const dailyPlans_0 = await DailyPlan.find({
    //   _id: { $in: allPlansID },
    //       startDate: {
    //         $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 3),
    //         $lte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3),
    //       },
    // })
    const dailyPlans0 = await DailyPlan.aggregate([
      {
        $match: {
          _id: { $in: allPlansID },
          startDate: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 3),
            $lte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3),
          },
        },
      },
      {
        $project: {
          startDate: 1,
        },
      },
    ]);
    
    console.log(dailyPlans0);
const startUtcDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() - 3));
const endUtcDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + 3));

console.log('Start UTC Date:', startUtcDate);
console.log('End UTC Date:', endUtcDate);

    const dailyPlans = await DailyPlan.aggregate([
      {
        $match: {
          _id: { $in: allPlansID },
          startDate: {
            $gte: startUtcDate,
            $lte: endUtcDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $toDate: "$startDate",
              },
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    console.log("---result", dailyPlans);

    res.status(200).json(dailyPlans);
  } catch (error) {
    next(error);
  }
};

export const updateDailyPlan = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const updatedPlan = await DailyPlan.findByIdAndUpdate(
      req.params.id,
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

export const deleteDailyPlan = async (req, res, next) => {
  //console.log(req)
  try {
    const plan = await DailyPlan.findById(req.params.id);
    if (!plan) return next(createError(404, "Daily plan not exists"));
    await DailyPlan.findByIdAndDelete(req.params.id, {
      $set: req.body,
    });
    console.log(plan);
    const planID = plan.id;
    await axios.delete(
      `http://localhost:8800/api/users/daily/${req.params.userID}/${planID}`,
      {
        userID: req.params.userID,
        id: planID,
      }
    );
    res.status(200).json("Daily plan has been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
