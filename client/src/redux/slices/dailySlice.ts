import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

 
// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    try {
      const response = await fetch('/api/dailyPlan/');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error; // Rethrow the error to be caught by the async thunk
    }
  });
  
const initialState={
    newDailyPlan:"",
    error:false,
    loading:false,
    allDailyData:[]
}

export const dailySlice = createSlice({
    name:'daily',
    initialState,
    reducers:{
        addDailyStart:(state)=>{
state.loading=true
        },
        addDailySuccess:(state,action)=>{
          state.loading=false
            state.allDailyData.push(action.payload)

            //TO DO
            // connect with backend server
        },
        addDailyFailed:(state)=>{
          state.loading=false
          state.error=true
        }

    }
})

export const {addDailyStart,addDailySuccess,addDailyFailed} = dailySlice.actions;
export default dailySlice.reducer;