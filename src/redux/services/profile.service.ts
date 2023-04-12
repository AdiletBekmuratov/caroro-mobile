import { User } from '@/types/index';
import { baseApi } from './baseApi';

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    findMe: builder.query<User, void>({
      query: () => `/users/me`,
    }),
  }),
});

export const { useFindMeQuery } = profileApi;
