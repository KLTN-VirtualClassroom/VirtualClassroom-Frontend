import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    getMaterial: (state, action) => {
      console.log(action);
      state = action.payload;
    },
    addMaterial: (state, action) => {
      state.push(action.payload);
    },
  },
});
export const { getMaterial, addMaterial } = materialSlice.actions;
export default materialSlice.reducer;
