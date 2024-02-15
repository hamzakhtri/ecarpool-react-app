import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentChatRoomId : "",
}

export const chatRoomSlice = createSlice({
    name: "chatroom",
    initialState,
    reducers : ({
        setCurrentChatRoomId : (state, action)=>{
            state.currentChatRoomId = action.payload;
        }
    })
})

export const {setCurrentChatRoomId} = chatRoomSlice.actions;
export default chatRoomSlice.reducer; 