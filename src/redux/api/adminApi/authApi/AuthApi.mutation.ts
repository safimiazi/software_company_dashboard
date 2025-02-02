import mainApi from "../../MainApi";

const authApiMutation = mainApi.injectEndpoints({
  endpoints: (build) => ({
    adminLogin: build.mutation({
      invalidatesTags: ["login_admin"],
      query: (loginData) => ({
        url: "/admin/login",
        method: "POST",
        body: loginData,
      }),
    }),
    adminLogout: build.mutation({
      invalidatesTags: ["login_admin"],
      query: () => ({
        url: "/admin/logout",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAdminLoginMutation, useAdminLogoutMutation } = authApiMutation;

