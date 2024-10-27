import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create api slice

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5050" }),
  endpoints: (builder) => ({
    // get all users
    getAllUsers: builder.query({
      query: () => "/api/v1/user",
    }),
    // get single user by id
    getUserById: builder.query({
      query: (id) => `/api/v1/user/${id}`,
    }),
    // create user
    createUser: builder.mutation({
      query: (user) => ({
        url: "/api/v1/user",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

// export endpoints
export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
} = apiSlice;

// export api slice
export default apiSlice;
