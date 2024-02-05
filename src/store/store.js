import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/user/userSlice"
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';


const persistConfig = {
    key : "root",
    version : 1,
    storage
}

const rootReducer = combineReducers({
    user: userReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
     
      serializableCheck: false,
    }),
})

export default store;   