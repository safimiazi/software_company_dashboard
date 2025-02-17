import mainApi from "../../MainApi";

const CaseStudyMutationApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    case_studyPost: build.mutation({
      query: (data) => {
        return {
          url: "/case_study/post_case_study_data",
          method: "POST",
          body: data,
        };
      },
    }),
    case_studyPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/case_study/put_case_study_data/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    case_studyDelete: build.mutation({
      query: ({ id }) => ({
        url: `/case_study/delete_case_study_data/${id}`,
        method: "DELETE",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useCase_studyDeleteMutation,
  useCase_studyPostMutation,
  useCase_studyPutMutation,
} = CaseStudyMutationApi;
