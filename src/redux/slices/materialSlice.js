import { createSlice } from "@reduxjs/toolkit";
import { materialApi } from "../../assets/materialApi";

const initialState = [];

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    getMaterial: (state, action) => {
      state = action.payload;
    },
    addMaterial: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      materialApi.endpoints.getPersonalMaterial.matchFulfilled,
      (state, action) => {
        return action.payload;
        // for(let i=0; i<action.payload.length; i++)
        //   state.push(action.payload[i])
        // console.log(action.payload);
        // state = action.payload;
      }
    );
  },
});
export const { getMaterial, addMaterial } = materialSlice.actions;
export default materialSlice.reducer;
