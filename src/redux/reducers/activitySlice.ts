import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoProps } from "./_model";
// import { UserInfoModel } from "./models";

interface ActivityStateProps {
  userActivity: any;
  attendance: any
}

const initialState: ActivityStateProps = {
  userActivity: [],
  attendance: [],
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setUserActivity: (
      state: any,
      action: PayloadAction<{ userInfo: any, isLoggedIn: boolean }>,
    ) => {
      state.userActivity = action?.payload;
    },

    setAttendance: (
      state: any,
      action: PayloadAction<{ attendance: any  }>,
    ) => {
      state.attendance = action?.payload;
    },
    
  },
});

export const { setUserActivity, setAttendance } = activitySlice.actions;
export default activitySlice.reducer;
