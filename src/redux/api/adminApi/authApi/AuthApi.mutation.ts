import { mainApi } from "../../MainApi";

const authApiMutation = mainApi.injectEndpoints({
  endpoints: (build) => ({
    adminLogin: build.mutation({
      query: (loginData) => ({
        url: "/admin/login", 
        method: "POST",
        body: loginData,
        credentials: "include",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAdminLoginMutation } = authApiMutation;
