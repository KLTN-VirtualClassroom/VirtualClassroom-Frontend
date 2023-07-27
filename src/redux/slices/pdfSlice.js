import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    setStatus: (state, action) => {
        console.log(action.payload)
      return action.payload;
    },
    removeStatus: (state, action) => {
      state={};
    },
  },
});
export const { setStatus, removeStatus } = pdfSlice.actions;
export default pdfSlice.reducer;