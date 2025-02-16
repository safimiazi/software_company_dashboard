import mainApi from "../../MainApi";

const ProjectMutationApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    projectPost: build.mutation({
      query: (data) => {
        return {
          url: "/project/post_project_data",
          method: "POST",
          body: data,
        };
      },
    }),
    projectPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/project/put_project_data/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    projectDelete: build.mutation({
      query: ({ id }) => ({
        url: `/project/delete_project_data/${id}`,
        method: "DELETE",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
 useProjectPostMutation,
 useProjectDeleteMutation,
 useProjectPutMutation,
 
} = ProjectMutationApi;
