import { createSlice } from "@reduxjs/toolkit";

import { materialApi } from "../../assets/materialApi";

const initialState = [];

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    getCourseList: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      materialApi.endpoints.getCourseList.matchFulfilled,
      (state, action) => {
        state = action.payload;
      }
    );
  },
});
export const { getCourseList } = courseSlice.actions;
export default courseSlice.reducer;
