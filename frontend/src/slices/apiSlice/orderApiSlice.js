import { apiSlice } from '../apiSlice'
import { ORDERS_URL } from '../../constants'


export const orderApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      createOrder: builder.mutation({
         query: (order) => ({
            url: ORDERS_URL,
            method: 'POST',
            body: { ...order }
         })
      }),
      getOrderDetails: builder.query({
         query: (orderId) => ({
            url: `${ORDERS_URL}/${orderId}`,
         }),
         keepUnusedDataFor: 5
      }),
      makeOrderPayment: builder.mutation({
         query: (orderId) => ({
            url: `${ORDERS_URL}/${orderId}/pay`,
            method: 'PUT',
            // body: { ...details }
         }),
         keepUnusedDataFor: 5
      }),
      getMyOrders: builder.query({
         query: () => ({
            url: `${ORDERS_URL}/myorders`,
            method: "GET"
         }),
         keepUnusedDataFor: 5
      }),
      getAllOrders: builder.query({
         query: () => ({
            url: ORDERS_URL
         }),
         keepUnusedDataFor: 5
      }),
      updateOrderToDelivered: builder.mutation({
         query: (orderId) => ({
            url: `${ORDERS_URL}/${orderId}/deliver`,
            method: 'PUT'
         }),
         keepUnusedDataFor: 5
      })
   })
})


export const {
   useCreateOrderMutation,
   useGetOrderDetailsQuery,
   useMakeOrderPaymentMutation,
   useGetMyOrdersQuery,
   useGetAllOrdersQuery,
   useUpdateOrderToDeliveredMutation
} = orderApiSlice