import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rides : []
}

export const rideSlice = createSlice({
    name : "rides",
    initialState,
    reducers : {
        loadRides : (state, action)=>{
            state.rides = action.payload;
        }
    }
})

export const {loadRides} = rideSlice.actions;
export default rideSlice.reducer;