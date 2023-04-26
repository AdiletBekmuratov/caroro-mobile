import { CreateOrderData, Order } from '@/types/index';
import { baseApi } from './baseApi';
import { providesList } from '@/utils/providesList';

export const ordersApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Orders'] })
  .injectEndpoints({
    endpoints: builder => ({
      createOrder: builder.mutation<Order, CreateOrderData>({
        query: body => ({
          url: `/orders`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Orders', 'Vehicles'],
      }),
      getMyOrders: builder.query<Order[], void>({
        query: () => `/orders`,
        providesTags: result => providesList(result, 'Orders'),
      }),
      getOneOrder: builder.query<Order, number>({
        query: id => `/orders/${id}`,
        providesTags: ['Orders'],
      }),

      startOrder: builder.mutation<void, number>({
        query: id => ({
          url: `/orders/start/${id}`,
          method: 'POST',
        }),
        invalidatesTags: ['Orders', 'Vehicles'],
      }),
      cancelOrder: builder.mutation<void, number>({
        query: id => ({
          url: `/orders/cancel/${id}`,
          method: 'POST',
        }),
        invalidatesTags: ['Orders', 'Vehicles'],
      }),
      completeOrder: builder.mutation<
        void,
        { id: number; lat: number; lon: number }
      >({
        query: ({ id, ...rest }) => ({
          url: `/orders/complete/${id}`,
          method: 'POST',
          body: rest,
        }),
        invalidatesTags: ['Orders', 'Vehicles'],
      }),
    }),
  });

export const {
  useGetMyOrdersQuery,
  useGetOneOrderQuery,
  useCreateOrderMutation,

  useStartOrderMutation,
  useCancelOrderMutation,
  useCompleteOrderMutation,
} = ordersApi;
