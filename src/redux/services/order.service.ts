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
        invalidatesTags: ['Orders'],
      }),
      cancelOrder: builder.mutation<void, number>({
        query: id => ({
          url: `/orders/cancel/${id}`,
          method: 'POST',
        }),
        invalidatesTags: ['Orders'],
      }),
      completeOrder: builder.mutation<void, number>({
        query: id => ({
          url: `/orders/complete/${id}`,
          method: 'POST',
        }),
        invalidatesTags: ['Orders'],
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
