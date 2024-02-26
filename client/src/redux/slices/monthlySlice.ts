import { createSlice } from "@reduxjs/toolkit";


interface MonthlyState {
  loading: boolean;
  newMonthlyPlan: any; // Change 'any' to the actual type of newMonthlyPlan
  allMonthlyData: any[]; // Change 'any' to the actual type of allMonthlyData
  error: boolean,
  updated:boolean
  firstFetchMonthlyPlans:boolean
}
const initialState: MonthlyState = {
  newMonthlyPlan: {},
  error: false,
  loading: false,
  updated: false,
  allMonthlyData: [],
  firstFetchMonthlyPlans: true,
};

export const MonthlySlice = createSlice({
  name: "Monthly",
  initialState,
  reducers: {
    initialMonthly:(state,action)=>{
      console.log(action.payload)
      state.allMonthlyData=action.payload
    },
    addMonthlyStart: (state) => {
      state.loading = true;
    },
    addMonthlySuccess: (state = initialState, action) => {
      state.loading = false;
      state.newMonthlyPlan=action.payload
      state.allMonthlyData.push(action.payload);

      //TO DO
      // connect with backend server
    },
    addMonthlyFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    updateToServerSuccess: (state) => {
      state.updated = true;
    },
    updateToServerFailed: (state) => {
      state.updated = false;
    },
  },
});

export const {
  addMonthlyStart,
  addMonthlySuccess,
  addMonthlyFailed,
  updateToServerSuccess,
  updateToServerFailed,
  initialMonthly,
} = MonthlySlice.actions;
export default MonthlySlice.reducer;
