import { configureStore } from "@reduxjs/toolkit";

import formDataReducer from "./Reducers/formDataSlice";
import userDataListReducer from "./Reducers/userDataListingSlice";

const store = configureStore({
  reducer: {
    formData: formDataReducer,
    userDataList: userDataListReducer,
  },
});

export default store;
