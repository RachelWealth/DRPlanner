import { createSlice } from "@reduxjs/toolkit";

interface DailyState {
  loading: boolean;
  newDailyPlan: any; // Change 'any' to the actual type of newDailyPlan
  allDailyData: any[]; // Change 'any' to the actual type of allDailyData
  error: boolean,
  updated:boolean
  firstFetchDailyPlans:boolean
}
const initialState: DailyState = {
  newDailyPlan: {},
  error: false,
  loading: false,
  updated: false,
  allDailyData: [],
  firstFetchDailyPlans: true,
};

export const dailySlice = createSlice({
  name: "daily",
  initialState,
  reducers: {
    initialDaily:(state,action)=>{
      console.log(action.payload)
      state.allDailyData=action.payload
    },
    addDailyStart: (state) => {
      state.loading = true;
    },
    addDailySuccess: (state = initialState, action) => {
      state.loading = false;
      state.newDailyPlan=action.payload
      state.allDailyData.push(action.payload);

      //TO DO
      // connect with backend server
    },
    addDailyFailed: (state) => {
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
  addDailyStart,
  addDailySuccess,
  addDailyFailed,
  updateToServerSuccess,
  updateToServerFailed,
  initialDaily,
} = dailySlice.actions;
export default dailySlice.reducer;
