import { createSlice } from "@reduxjs/toolkit";
interface YearlyState {
  loading: boolean;
  newYearlyPlan: any; // Change 'any' to the actual type of newYearlyPlan
  allYearlyData: any[]; // Change 'any' to the actual type of allYearlyData
  error: boolean,
  updated:boolean
  firstFetchYearlyPlans:boolean
}
const initialState: YearlyState = {
  newYearlyPlan: {},
  error: false,
  loading: false,
  updated: false,
  allYearlyData: [],
  firstFetchYearlyPlans: true,
};

export const YearlySlice = createSlice({
  name: "Yearly",
  initialState,
  reducers: {
    initialYearly:(state,action)=>{
      console.log(action.payload)
      state.allYearlyData=action.payload
    },
    addYearlyStart: (state) => {
      state.loading = true;
    },
    addYearlySuccess: (state, action) => {
      state.loading = false;
      state.newYearlyPlan=action.payload
      state.allYearlyData.push(action.payload);

      //TO DO
      // connect with backend server
    },
    addYearlyFailed: (state) => {
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
  addYearlyStart,
  addYearlySuccess,
  addYearlyFailed,
  updateToServerSuccess,
  updateToServerFailed,
  initialYearly,
} = YearlySlice.actions;
export default YearlySlice.reducer;
