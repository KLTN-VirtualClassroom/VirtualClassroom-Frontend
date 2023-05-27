import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     courseId: '',
//     dataUpload: '',
//     fileId: '',
//     fileNumber: '',
//     lastAccess: '',
//     linkId: '',
//     topicId: '', 
//     _id: ''
// };]

const initialState = [];

const courseSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    getCourseList: (state, action) => {
        console.log(action);
        state = action.payload;
      },
  },
});
export const { getCourseList } = courseSlice.actions;
export default courseSlice.reducer;