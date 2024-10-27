import apiSlice from "../../app/api/apiSlice.js";

// create team api slice

const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all team members
    getAllTeamMembers: builder.query({
      query: () => "/api/v1/user",
      providesTags: ["Teams"],
      transformResponse: (result) => {
        // return result.reverse();
        return result.sort((a, b) => a.name.localeCompare(b.name));
      },
    }),
    // get single team member
    getSingleTeamMember: builder.query({
      query: (id) => `/api/v1/user/${id}`,
      providesTags: (result, error, arg) => {
        return [{ type: "Team", id: result._id }];
      },
    }),
    // create a team member
    createTeamMember: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user",
        method: "POST",
        body: data,
      }),
      // create er por notun kore reload newar jonno
      invalidatesTags: ["Teams"],
    }),
    // update a team member
    updateTeamMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/user/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // delete a team member
    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `/api/v1/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teams"],
    }),
  }),
});

// export endpoints
export const {
  useGetAllTeamMembersQuery,
  useGetSingleTeamMemberQuery,
  useCreateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamApiSlice;

// export team api slice
export default teamApiSlice;
