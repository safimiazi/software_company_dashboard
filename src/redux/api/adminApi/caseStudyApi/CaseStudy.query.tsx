import mainApi from "../../MainApi";

const CaseStudyQueryApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getcase_studyData: build.query({
      query: ({ pageIndex, pageSize, search }) => ({
        url: "/case_study/get_case_study_data",
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

export const { useGetcase_studyDataQuery } = CaseStudyQueryApi;
