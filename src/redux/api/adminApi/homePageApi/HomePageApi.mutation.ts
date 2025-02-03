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
    }),
    homeBannerPut: build.mutation({
      query: () => ({
        url: "/admin/put_home_banner_data",
        method: "PUT",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useHomeBannerPostMutation, useHomeBannerPutMutation } =
  homePageApiMutation;
