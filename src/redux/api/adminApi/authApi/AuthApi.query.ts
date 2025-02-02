import { mainApi } from "../../MainApi"

const authApiQuery = mainApi.injectEndpoints({
    endpoints: (build) => ({
      example: build.query({
        query: () => 'test',
      }),
    }),
    overrideExisting: false,
  })
  
  export const { useExampleQuery } = authApiQuery