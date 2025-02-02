import { mainApi } from "../../MainApi";

const authApiMutation = mainApi.injectEndpoints({
  endpoints: (build) => ({
    adminLogin: build.mutation({
      query: (loginData) => {
        return {
          url: "/admin/login", 
          method: "POST",
          body: loginData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useAdminLoginMutation } = authApiMutation;
