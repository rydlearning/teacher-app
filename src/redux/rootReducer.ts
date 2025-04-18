
// redux/store.ts
import {  combineReducers } from '@reduxjs/toolkit';

// Import your reducers here
import authSlice from './reducers/authSlice';
import activitySlice from './reducers/activitySlice';
// import dayTimeReducer from './reducers/timeSlice'



const rootReducer = combineReducers({
    auth: authSlice,
    activity: activitySlice
    // dayTime: dayTimeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof rootReducer.dispatch;

export default rootReducer;



