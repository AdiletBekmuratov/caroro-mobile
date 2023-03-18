import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const osmApi = createApi({
  reducerPath: 'osmApi',
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://nominatim.openstreetmap.org',
  }),
  endpoints: builder => ({
    getAddressFromLatLng: builder.query<any, { latLng: [number, number] }>({
      query: ({ latLng }) =>
        `/reverse?lat=${latLng[0]}&lon=${latLng[1]}&addressdetails=1&format=jsonv2`,
    }),
  }),
});

export const { useGetAddressFromLatLngQuery } = osmApi;
