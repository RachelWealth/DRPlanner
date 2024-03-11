import { createSlice } from "@reduxjs/toolkit";

interface MonthlyYearlyState {
  loading: boolean;
  newMonthlyYearlyPlan: any; // Change 'any' to the actual type of newMonthlyYearlyPlan
  allMonthlyData: any[]; // Change 'any' to the actual type of allMonthlyYearlyData
  allYearlyData: any[],
  error: boolean,
  updated:boolean,
  firstFetchMonthlyYearlyPlans:boolean,
  choicedPlanDetails:any,
}
const initialState: MonthlyYearlyState = {
  newMonthlyYearlyPlan: {},
  error: false,
  loading: false,
  updated: false,
  allYearlyData: [],
  allMonthlyData: [],
  firstFetchMonthlyYearlyPlans: true,
  choicedPlanDetails:{}
};

export const monthlyYearlySlice = createSlice({
  name: "monthlyYearly",
  initialState,
  reducers: {
    initialMonthlyYearly:(state,action:any)=>{
      console.log(action.payload[0],action.payload[1])
      if(action.payload[0]==="Monthly"){
        state.allMonthlyData=action.payload[1]
      }else{
        state.allYearlyData=action.payload[1]
      }
    },
    addMonthlyYearlyStart: (state) => {
      state.loading = true;
    },
    addMonthlyYearlySuccess: (state, action) => {
      state.loading = false;
      if(action.payload[0]==="Monthly"){
        state.allMonthlyData.push(action.payload[1])
      }else{
        state.allYearlyData.push(action.payload[1])
      }
    },
    addMonthlyYearlyFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    updateToServerSuccess: (state) => {
      state.updated = true;
    },
    updateToServerFailed: (state) => {
      state.updated = false;
    },
    updateMonthlyYearlyPlanStart:(state,action)=>{
      state.choicedPlanDetails=action.payload
      state.loading=true;
    },
    updateMonthlyYearlyPlanSuccess:(state,action)=>{
      state.loading=false;
      state.updated=true;
      if(action.payload[0]==="Monthly"){
        state.allMonthlyData = state.allMonthlyData.map((item) =>
          item._id === action.payload[1]._id ? { ...item, ...action.payload[1].newChange } : {...item}
      )
      }else{
        state.allYearlyData = state.allYearlyData.map((item) =>
          item._id === action.payload[1]._id ? { ...item, ...action.payload[1].newChange } : {...item}
      )
      }
    },
    updateMonthlyYearlyPlanFailed:(state)=>{
      state.loading=false;
      state.updated=true;
    }
  },
});

export const {
  addMonthlyYearlyStart,
  addMonthlyYearlySuccess,
  addMonthlyYearlyFailed,
  updateToServerSuccess,
  updateToServerFailed,
  initialMonthlyYearly,
  updateMonthlyYearlyPlanStart,
  updateMonthlyYearlyPlanSuccess,
  updateMonthlyYearlyPlanFailed
} = monthlyYearlySlice.actions;
export default monthlyYearlySlice.reducer;
