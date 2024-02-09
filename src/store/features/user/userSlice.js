import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    userAds : []
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        addCurrentUser : (state, action)=>{
            state.currentUser = action.payload;
        },

        addUserAds : (state, action)=>{
            state.userAds = action.payload;
        },
        updateUserAds : (state, action)=>{
            state.userAds = state.userAds.map((ride)=> ride.id === action.payload.id ? [...ride, ...action.payload.updatedRide] : ride);
        }
    }
})

export const {addCurrentUser, addUserAds, updateUserAds} = userSlice.actions;
export default userSlice.reducer; 

