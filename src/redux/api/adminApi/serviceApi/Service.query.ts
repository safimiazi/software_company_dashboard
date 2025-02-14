import mainApi from "../../MainApi";

const homePageApiQuery = mainApi.injectEndpoints({
  endpoints: (build) => ({
    //   Home Page Banner
    getservicesData: build.query({
      query: ({ pageIndex, pageSize, search }) => ({
        url: "/services/get_services_data",
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

export const { useGetservicesDataQuery } = homePageApiQuery;
