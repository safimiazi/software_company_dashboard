import mainApi from "../../MainApi";

const homePageApiMutation = mainApi.injectEndpoints({
  endpoints: (build) => ({
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
      query: ({data, id}) => ({
        url: "/home_banner/put_home_banner_data",
        method: "PUT",
        body: data,
        params: {id}
      }),
    }),
    homeBannerDelete: build.mutation({
      query: ({id}) => ({
        url: "/home_banner/delete_home_banner_data",
        method: "DELETE",
        params: {id}
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useHomeBannerPostMutation, useHomeBannerPutMutation, useHomeBannerDeleteMutation } =
  homePageApiMutation;
