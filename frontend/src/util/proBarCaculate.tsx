import { DateTime } from "luxon";
interface Props {
  plan: any;
  type: String;
}

export function proBarCalculate(
  plan: any,
  type: string | String
): [number, number, number] {
  // const currentDate = DateTime.local();
  // const numberOfDaysInMonth = currentDate.daysInMonth;

  const currentDate = DateTime.now();
  const startDate = DateTime.fromISO(plan.startDate);
  const endDate = DateTime.fromISO(plan.endDate);

  const daysPassed = currentDate.diff(startDate, "days").days;
  const totalDays = endDate.diff(startDate, "days").days;
  var numberOfDays = 0,
    firstToStart = 0;

  if (type === "Monthly") {
    numberOfDays = currentDate.daysInMonth;
    firstToStart = currentDate.diff(currentDate.startOf("month")).milliseconds;
  } else {
    numberOfDays = currentDate.daysInYear;
    firstToStart = currentDate.diff(currentDate.startOf("year")).milliseconds;
  }

  return [
    firstToStart/(24 * 60 * 60 * 1000) / numberOfDays,
    daysPassed / numberOfDays,
    (totalDays - daysPassed) / numberOfDays,
  ];
}
