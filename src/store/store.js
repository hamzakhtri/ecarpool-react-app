import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/user/userSlice";
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import ridesReducer from "./features/rides/ridesSlice";
import chatReducer from "./features/chatroom/chatRoomSlice"

// Configuration for persisting userReducer
const userPersistConfig = {
    key: "user",
    version: 1,
    storage
}

const chatroomPersistConfig = {
    key: "chatroom",
    version: 1,
    storage
}

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedChatroomReducer = persistReducer(chatroomPersistConfig, chatReducer);

// Combined reducers
const rootReducer = combineReducers({
    user: persistedUserReducer, // Persisted userReducer
    rides: ridesReducer, // Non-persisted ridesReducer
    chatroom: persistedChatroomReducer //persisted chatReducer
});

// Create store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
