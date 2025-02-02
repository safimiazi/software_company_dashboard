
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' , credentials: 'include'}),
    endpoints: () => ({}),

  })
  

