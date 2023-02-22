import { baseApi } from './baseApi';

// Define a service using a base URL and expected endpoints
export const makesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCarBrands: builder.query<any, void>({
      query: () => `/makes`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCarBrandsQuery } = makesApi;
