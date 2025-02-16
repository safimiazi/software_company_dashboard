import mainApi from "../../MainApi";

const sectionHeaderApiMutation = mainApi.injectEndpoints({
  endpoints: (build) => ({
    section_headerPost: build.mutation({
      query: (data) => {
        return {
          url: "/section_header/post_section_header_data",
          method: "POST",
          body: data,
        };
      },
    }),
    section_headerPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/section_header/put_section_header_data/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    section_headerDelete: build.mutation({
      query: ({ id }) => ({
        url: `/section_header/delete_section_header_data/${id}`,
        method: "DELETE",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useSection_headerDeleteMutation,
  useSection_headerPostMutation,
  useSection_headerPutMutation,
} = sectionHeaderApiMutation;
