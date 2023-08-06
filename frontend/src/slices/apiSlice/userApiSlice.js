import { USERS_URL } from "../../constants";
import { apiSlice } from "../apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/login`,
            method: 'POST',
            body: data,
         })
      }),
      register: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}`,
            method: 'POST',
            body: data,
         })
      }),
      logout: builder.mutation({
         query: () => ({
            url: `${USERS_URL}/logout`,
            method: 'POST',

         })
      }),
      UpdateProfile: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/profile`,
            method: 'PUT',
            body: data
         })
      }),
      adminGetAllUsers: builder.query({
         query: () => ({
            url: `${USERS_URL}`,
         }),
         providesTags: ['Users'],
         // keepUnusedDataFor: 5
      }),
      adminGetUserById: builder.query({
         query: (userId) => ({
            url: `${USERS_URL}/${userId}`
         }),
         keepUnusedDataFor: 5
      }),
      adminDeleteUser: builder.mutation({
         query: (userId) => ({
            url: `${USERS_URL}/${userId}`,
            method: 'DELETE',
         })
      }),
      adminUpdateUser: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/${data.userId}`,
            method: 'PUT',
            body: data
         }),
         invalidatesTags: ['Users'],
         keepUnusedDataFor: 5
      })
   })
})



export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateProfileMutation, useAdminGetAllUsersQuery, useAdminDeleteUserMutation, useAdminGetUserByIdQuery, useAdminUpdateUserMutation } = userApiSlice;