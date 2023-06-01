import { baseApi } from './baseApi';

export const materialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalMaterial: builder.mutation({
      query: (credentials) => ({
        url: `material/getPersonalMaterial?teacherID=${credentials}`,
        method: 'GET',
      }),
    }),
    getTopicList: builder.mutation({
        query: () => ({
          url: "topic/getTopicByCourse",
          method: 'GET',
        }),
      }),
      getCourseList: builder.mutation({
        query: () => ({
          url: "course/getCourse",
          method: 'GET',
        }),
      }),
  }),
});

export const { useGetCourseListMutation, useGetTopicListMutation, useGetPersonalMaterialMutation  } = materialApi;