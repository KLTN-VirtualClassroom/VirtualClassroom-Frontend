import { configureStore } from "@reduxjs/toolkit";

import accountSlice from "./slices/accountSlice";
import materialSlice from "./slices/materialSlice";
import courseSlice from "./slices/courseSlice";
import topicSlice from "./slices/topicSlice";
import pdfSlice from "./slices/pdfSlice";

import {baseApi} from "../assets/baseApi.js"

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,

    account: accountSlice,
    material: materialSlice,
    course: courseSlice,
    topic: topicSlice,
    pdf: pdfSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;

