import { configureStore } from "@reduxjs/toolkit";

import accountSlice from "./slices/accountSlice";
import materialSlice from "./slices/materialSlice";
import courseSlice from "./slices/courseSlice";


const store = configureStore({
  reducer: {
    account: accountSlice,
    material: materialSlice,
    course: courseSlice
  },
});

export default store;
