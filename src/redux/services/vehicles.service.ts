import { PaginatedResponse, Vehicle } from '@/types/index';
import { baseApi } from './baseApi';

export const vehiclesApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Vehicles'] })
  .injectEndpoints({
    endpoints: builder => ({
      getAllVehicles: builder.query<PaginatedResponse<Vehicle>, string>({
        query: queryParams => `/vehicles?${queryParams}`,
      }),
      getOneVehicle: builder.query<Vehicle, number>({
        query: id => `/vehicles/${id}`,
        providesTags: ['Vehicles'],
      }),
    }),
  });

export const { useGetAllVehiclesQuery, useGetOneVehicleQuery } = vehiclesApi;
