import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curUser: null,
  loading: false,
  error: false,
  needFirstFetchDailyPlans: true,
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
      state.needFirstFetchDailyPlans = true;
    },
    loginFailed: (state) => {
      state.loading = false;
      state.error = true;
      state.needFirstFetchDailyPlans = true;
    },
    logout: (state) => {
      //state=initialState
      state.curUser = null;
      state.loading = false;
      state.error = false;
      state.needFirstFetchDailyPlans = true;
    },
    changeAccount: (state, action) => {
      //TODO
    },
    firstFetchSuccess: (state) => {
      state.needFirstFetchDailyPlans = false;
    },
    firstFetchFailed: (state) => {
      state.needFirstFetchDailyPlans = true;
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
