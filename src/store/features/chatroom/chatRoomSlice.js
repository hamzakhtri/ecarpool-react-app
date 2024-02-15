import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentChatRoomId : "",
    frontUser : ""
}

export const chatRoomSlice = createSlice({
    name: "chatroom",
    initialState,
    reducers : ({
        setCurrentChatRoomId : (state, action)=>{
            state.currentChatRoomId = action.payload;
        },
        setFrontUser : (state, action) =>{
            state.frontUser = action.payload;
        }
    })
})

export const {setCurrentChatRoomId, setFrontUser} = chatRoomSlice.actions;
export default chatRoomSlice.reducer; 