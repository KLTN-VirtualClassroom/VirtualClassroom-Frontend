import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    password: '',
    role: '',
    room_id: '',
    status: ''
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountInfo: (state, action) => {
      state = action.payload;
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