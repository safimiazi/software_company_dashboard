import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_url } from "../../Proxy";

 const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_url,
    credentials: "include",
  
    
  }),
  tagTypes:["login_admin"],

  endpoints: () => ({}),
});

export default mainApi;
