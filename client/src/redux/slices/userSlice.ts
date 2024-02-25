import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching tasks

  
const initialState={
    curUser:null,
    loading:false,
    error:false,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading = true
        },
        loginSuccess:(state,action)=>{
            state.loading=true
            state.curUser = action.payload
        },
        loginFailed:(state)=>{
            state.loading=false;
            state.error=true;
        },
        logout:()=>{
            return initialState
        },
        changeAccount:(state,action)=>{
            //TODO
        },
    }
})

export const {loginStart,loginSuccess,loginFailed,logout,changeAccount} = userSlice.actions;
export default userSlice.reducer;