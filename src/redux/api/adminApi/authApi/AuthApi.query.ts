import mainApi from "../../MainApi"

const authApiQuery = mainApi.injectEndpoints({
    endpoints: (build) => ({
      getAdminData: build.query({
        query: () => ({
            url: "/admin/get_admin_data",
            method: "GET"

        }),
        providesTags:["login_admin"],

      }),
    }),
    overrideExisting: false,
  })
  
  export const { useGetAdminDataQuery } = authApiQuery