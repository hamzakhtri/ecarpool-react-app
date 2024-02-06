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
        }
    }
})

export const {addCurrentUser, addUserAds} = userSlice.actions;
export default userSlice.reducer; 

