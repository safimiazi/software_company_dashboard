import mainApi from "../../MainApi";

const serviceApiMutation = mainApi.injectEndpoints({
  endpoints: (build) => ({
    // Banner
    servicesPost: build.mutation({
      query: (data) => {
        return {
          url: "/services/post_services_data",
          method: "POST",
          body: data,
        };
      },
    }),
    servicesPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/services/put_services_data/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    servicesDelete: build.mutation({
      query: ({ id }) => ({
        url: `/services/delete_services_data/${id}`,
        method: "DELETE",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useServicesDeleteMutation,
  useServicesPostMutation,
  useServicesPutMutation,
} = serviceApiMutation;
