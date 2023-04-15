import { EditProfileFormData, User } from '@/types/index';
import { baseApi } from './baseApi';

export const profileApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['User'] })
  .injectEndpoints({
    endpoints: builder => ({
      findMe: builder.query<User, void>({
        query: () => `/users/me`,
        providesTags: ['User'],
      }),
      updateProfile: builder.mutation<User, EditProfileFormData>({
        query: body => ({
          url: `/users`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: ['User'],
      }),
      uploadDriverLicense: builder.mutation<User, FormData>({
        query: body => ({
          url: `/users/upload/licenses`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['User'],
      }),
    }),
  });

export const {
  useFindMeQuery,
  useUpdateProfileMutation,
  useUploadDriverLicenseMutation,
} = profileApi;
