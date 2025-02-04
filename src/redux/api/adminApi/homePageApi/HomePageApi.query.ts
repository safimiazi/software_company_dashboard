import mainApi from "../../MainApi"

const homePageApiQuery = mainApi.injectEndpoints({
    endpoints: (build) => ({


    //   Home Page Banner
      getHomePageBannerData: build.query({
        query: () => ({
            url: "/home_banner/get_home_page_banner_data",
            method: "GET"

        }),

      }),
    }),
    overrideExisting: false,
  })
  
  export const { useGetHomePageBannerDataQuery } = homePageApiQuery