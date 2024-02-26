import { DateTime } from "luxon";

export function proBarCalculate(plan: any): number {
  const currentDate = DateTime.now();
  const startDate = DateTime.fromISO(plan.startDate);
  const endDate = DateTime.fromISO(plan.endDate);

  const daysPassed = currentDate.diff(startDate, "days").days;
  const totalDays = endDate.diff(startDate, "days").days;

  return daysPassed / totalDays;
}
