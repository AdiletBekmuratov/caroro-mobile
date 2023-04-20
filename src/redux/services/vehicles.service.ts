import { PaginatedResponse, Vehicle } from '@/types/index';
import { baseApi } from './baseApi';

export const vehiclesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllVehicles: builder.query<PaginatedResponse<Vehicle>, string>({
      query: queryParams => `/vehicles?${queryParams}`,
    }),
    getOneVehicle: builder.query<Vehicle, number>({
      query: id => `/vehicles/${id}`,
    }),
  }),
});

export const { useGetAllVehiclesQuery, useGetOneVehicleQuery } = vehiclesApi;
