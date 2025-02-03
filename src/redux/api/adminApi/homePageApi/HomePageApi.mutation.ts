import mainApi from "../../MainApi";

const homePageApiMutation = mainApi.injectEndpoints({
  endpoints: (build) => ({
    adminLogin: build.mutation({
      query: (loginData) => {
        return {
          url: "/admin/login",
          method: "POST",
          body: loginData,
        };
      },
      invalidatesTags: ["login_admin"],
    }),
    adminLogout: build.mutation({
      query: () => ({
        url: "/admin/logout",
        method: "POST",
      }),
      invalidatesTags: ["login_admin"],
    }),
  }),
  overrideExisting: false,
});

export const { useAdminLoginMutation, useAdminLogoutMutation } =
  homePageApiMutation;
