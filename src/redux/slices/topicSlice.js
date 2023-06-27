import { createSlice } from "@reduxjs/toolkit";
import { materialApi } from "../../assets/materialApi";

const initialState = [];

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    getTopicList: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      materialApi.endpoints.getTopicList.matchFulfilled,
      (state, action) => {
        return action.payload;
        
      }
    );
  },
});
export const { getTopicList } = topicSlice.actions;
export default topicSlice.reducer;
