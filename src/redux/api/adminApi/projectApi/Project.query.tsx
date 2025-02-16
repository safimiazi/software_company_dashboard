import mainApi from "../../MainApi";

const ProjectQueryApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getProjectData: build.query({
      query: ({ pageIndex, pageSize, search }) => ({
        url: "/project/get_project_data",
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

export const { useGetProjectDataQuery } = ProjectQueryApi;
