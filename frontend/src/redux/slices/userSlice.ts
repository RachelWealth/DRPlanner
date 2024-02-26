import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curUser: null,
  loading: false,
  error: false,
  firstFetchDailyPlans: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = true;
      state.curUser = action.payload;
      state.firstFetchDailyPlans = true;
    },
    loginFailed: (state) => {
      state.loading = false;
      state.error = true;
      state.firstFetchDailyPlans = false;
    },
    logout: (state) => {
      //state=initialState
      state.curUser = null;
      state.loading = false;
      state.error = false;
      state.firstFetchDailyPlans = true;
    },
    changeAccount: (state, action) => {
      //TODO
    },
    firstFetchSuccess: (state) => {
      state.firstFetchDailyPlans = true;
    },
    firstFetchFailed: (state) => {
      state.firstFetchDailyPlans = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  changeAccount,
  firstFetchSuccess,
  firstFetchFailed,
} = userSlice.actions;
export default userSlice.reducer;
