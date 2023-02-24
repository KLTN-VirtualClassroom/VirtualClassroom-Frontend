import { configureStore } from "@reduxjs/toolkit";

import accountSlice from "./slices/accountSlice";

const store = configureStore({
  account: accountSlice,
});

export default store;
