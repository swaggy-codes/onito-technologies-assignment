import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDataList: [],
};

const userDataListingSlice = createSlice({
  name: "userDataList",
  initialState,
  reducers: {
    storeUserDataList(state, action) {
      console.log(action.payload, "consoleeeeeeeeeeeeeeeeeeeeeeeeeees", state, initialState?.userDataList);
      state.userDataList = [...state?.userDataList, action?.payload];
      // return state;
    },
  },
});

export const userDataListingActions = userDataListingSlice.actions;

export default userDataListingSlice.reducer;
