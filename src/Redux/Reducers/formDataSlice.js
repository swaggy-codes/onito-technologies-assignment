import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formDetails: "",
};

const formSlice = createSlice({
  name: "formDetails",
  initialState,
  reducers: {
    storeFormData(state, action) {
      // console.log(action.payload, "inside form data slice...", state);
      state = action.payload;
      return state;
    },
  },
});

export const formDetailsActions = formSlice.actions;

export default formSlice.reducer;
