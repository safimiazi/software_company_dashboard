import mainApi from "../../MainApi";

const homePageApiMutation = mainApi.injectEndpoints({
  endpoints: (build) => ({
    homeBannerPost: build.mutation({
      query: (data) => {
        return {
          url: "/admin/post_home_banner_data",
          method: "POST",
          body: data,
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
