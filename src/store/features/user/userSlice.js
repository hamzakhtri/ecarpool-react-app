import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        addCurrentUser : (state, action)=>{
            state.currentUser = action.payload;
        }
    }
})

export const {addCurrentUser} = userSlice.actions;
export default userSlice.reducer; 

