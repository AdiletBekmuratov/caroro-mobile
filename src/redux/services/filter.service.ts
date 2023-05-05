import {
  CreateOrderData,
  Engine,
  GearBox,
  Order,
  VehicleType,
} from '@/types/index';
import { baseApi } from './baseApi';
import { providesList } from '@/utils/providesList';

export const filtersApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Orders'] })
  .injectEndpoints({
    endpoints: builder => ({
      findAllEngines: builder.query<Engine[], void>({
        query: () => `/engines`,
      }),
      findAllVehicleTypes: builder.query<VehicleType[], void>({
        query: () => `/vehicle-types`,
      }),
      findAllGaerBoxes: builder.query<GearBox[], void>({
        query: () => `/gearboxes`,
      }),
    }),
  });

export const {
  useFindAllEnginesQuery,
  useFindAllGaerBoxesQuery,
  useFindAllVehicleTypesQuery,
} = filtersApi;
