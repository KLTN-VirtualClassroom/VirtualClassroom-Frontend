import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    password: '',
    role: '',
    roomId: '',
    email: '',
    status: ''
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountInfo: (state, action) => {
      state = action.payload;
      state.status = "in"
    },
    setAccountStatus: (state, action) => {
      state.status = "out";
    },
    setAccountRole:  (state, action) => {
        state.role = action.payload;
    }

  },
});
export const { setAccountInfo, setAccountStatus, setAccountRole } = accountSlice.actions;
export default accountSlice.reducer;