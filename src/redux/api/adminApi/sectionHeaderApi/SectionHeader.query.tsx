import mainApi from "../../MainApi";

const sectionHeaderApiQuery = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getsection_headerData: build.query({
      query: ({ pageIndex, pageSize, search }) => ({
        url: "/section_header/get_section_header_data",
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

export const { useGetsection_headerDataQuery } = sectionHeaderApiQuery;
