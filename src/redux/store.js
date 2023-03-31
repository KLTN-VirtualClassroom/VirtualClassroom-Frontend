import { configureStore } from "@reduxjs/toolkit";

import accountSlice from "./slices/accountSlice";
import materialSlice from "./slices/materialSlice";

const store = configureStore({
  reducer: {
    account: accountSlice,
    material: materialSlice
  },
});

export default store;
