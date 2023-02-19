import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const unauthApi = createApi({
  reducerPath: 'unauthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getCarManufactirers: builder.query<any, void>({
      query: () =>
        `https://private-anon-3b422679cb-carsapi1.apiary-mock.com/manufacturers`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCarManufactirersQuery } = unauthApi