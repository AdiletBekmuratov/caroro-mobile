import { Make, PaginatedResponse } from '@/types/index';
import { baseApi } from './baseApi';
import { mergeArrays } from '@/utils/merge-arrays';

export const makesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCarBrands: builder.query<PaginatedResponse<Make>, string>({
      query: queryParams => `/makes?${queryParams}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (newItems.meta.currentPage > currentCache.meta.currentPage) {
          currentCache.links = newItems.links;
          currentCache.meta = newItems.meta;
        }
        currentCache.data = mergeArrays(
          currentCache.data,
          newItems.data,
        ) as Make[];
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetCarBrandsQuery } = makesApi;
