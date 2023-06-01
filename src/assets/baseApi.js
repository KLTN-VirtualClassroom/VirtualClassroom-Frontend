import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config/config';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: config.path.SERVER_PATH,
  }),
  endpoints: (builder) => ({}),
});