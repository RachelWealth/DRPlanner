import DailyPlan from "../models/DailyPlan.js";
import MonthlyPlan from "../models/MonthlyPlan.js";
import YearlyPlan from "../models/YearlyPlan.js";
import User from "../models/User.js";

export const getCompletePlans = async (req, res, next) => {
  const user = await User.findById(req.params.userID);
  if (!user) {
    return res.status(404).json(createError("User not found"));
  }

  console.log("*******",user)
  try {
    const dailyPlanIds = user.daily;
    
    const dailyPlans = await DailyPlan.find({
      _id: { $in: dailyPlanIds },
      state: "Complete",
    });
console.log(dailyPlanIds,dailyPlans)
    const monthlyPlanIds = user.daily;
    const monthlyPlans = await MonthlyPlan.find({
      _id: { $in: monthlyPlanIds },
      state: "Complete",
    });
    console.log(monthlyPlans)
    const yearlyPlanIds = user.yearly;
    const yearlyPlans = await YearlyPlan.find({
      _id: { $in: yearlyPlanIds },
      state: "Complete",
    });
    console.log(yearlyPlans)
    const rt = dailyPlans.concat(monthlyPlans, yearlyPlans);
    console.log(rt);

    res.status(200).json(rt);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
