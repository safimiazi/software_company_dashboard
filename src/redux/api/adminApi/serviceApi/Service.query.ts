import mainApi from "../../MainApi";

const homePageApiQuery = mainApi.injectEndpoints({
  endpoints: (build) => ({
    //   Home Page Banner
    getHomePageBannerData: build.query({
      query: ({ pageIndex, pageSize, search }) => ({
        url: "/home_banner/get_home_page_banner_data",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
        },
      }),
    }),
    // about
    getHomePageAboutData: build.query({
      query: ({ pageIndex, pageSize, search }) => ({
        url: "/home_about/get_home_page_about_data",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetHomePageBannerDataQuery,useGetHomePageAboutDataQuery } = homePageApiQuery;
