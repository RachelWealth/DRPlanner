import { createSlice } from "@reduxjs/toolkit";

const initialState={
    dailyData:[]
}

export const dailySlice = createSlice({
    name:'daily',
    initialState,
    reducers:{
        addDaily:(state,action)=>{
            state.dailyData.push(action.payload)

            //TO DO
            // connect with backend server
        }
    }
})

export const {addDaily} = dailySlice.actions;
export default dailySlice.reducer;