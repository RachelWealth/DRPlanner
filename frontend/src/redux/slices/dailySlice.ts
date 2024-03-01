import { createSlice } from "@reduxjs/toolkit";

interface DailyState {
  loading: boolean;
  newDailyPlan: any; // Change 'any' to the actual type of newDailyPlan
  allDailyData: any[]; // Change 'any' to the actual type of allDailyData
  error: boolean,
  updated:boolean,
  firstFetchDailyPlans:boolean,
  choicedPlanDetails:any,
}
const initialState: DailyState = {
  newDailyPlan: {},
  error: false,
  loading: false,
  updated: false,
  allDailyData: [],
  firstFetchDailyPlans: true,
  choicedPlanDetails:{}
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
    addDailySuccess: (state, action) => {
      state.loading = false;
      state.newDailyPlan=action.payload
      state.allDailyData.push(action.payload);
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
    updateDailyPlanStart:(state,action)=>{
      state.choicedPlanDetails=action.payload
      
      state.loading=true;
    },
    updateDailyPlanSuccess:(state,action)=>{
      state.loading=false;
      state.updated=true;
      state.allDailyData.push(action.payload);
    },
    updateDailyPlanFailed:(state)=>{
      state.loading=false;
      state.updated=true;
    }
  },
});

export const {
  addDailyStart,
  addDailySuccess,
  addDailyFailed,
  updateToServerSuccess,
  updateToServerFailed,
  initialDaily,
  updateDailyPlanStart,
  updateDailyPlanSuccess,
  updateDailyPlanFailed
} = dailySlice.actions;
export default dailySlice.reducer;
