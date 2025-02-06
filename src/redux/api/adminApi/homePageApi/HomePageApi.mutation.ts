import mainApi from "../../MainApi";

const homePageApiMutation = mainApi.injectEndpoints({
  endpoints: (build) => ({
    // Banner
    homeBannerPost: build.mutation({
      query: (data) => {
        return {
          url: "/home_banner/post_home_banner_data",
          method: "POST",
          body: data,
        };
      },
    }),
    homeBannerPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/home_banner/put_home_banner_data/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    homeBannerDelete: build.mutation({
      query: ({ id }) => ({
        url: `/home_banner/delete_home_banner_data/${id}`,
        method: "DELETE",
      }),
    }),

    // about
    homeAboutPost: build.mutation({
      query: (data) => {
        return {
          url: "/home_about/post_home_about_data",
          method: "POST",
          body: data,
        };
      },
    }),
    homeAboutPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/home_about/put_home_about_data/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    homeAboutDelete: build.mutation({
      query: ({ id }) => ({
        url: `/home_about/delete_home_about_data/${id}`,
        method: "DELETE",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useHomeBannerPostMutation,
  useHomeBannerPutMutation,
  useHomeBannerDeleteMutation,
  useHomeAboutPostMutation,
  useHomeAboutPutMutation,
  useHomeAboutDeleteMutation,
} = homePageApiMutation;
