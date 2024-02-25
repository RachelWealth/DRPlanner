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