import apiSlice from "../../app/api/apiSlice.js";

// create team api slice

const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all team members
    getAllTeamMembers: builder.query({
      query: () => "/api/v1/user",
    }),
    // get single team member
    getSingleTeamMember: builder.query({
      query: (id) => `/api/v1/user/${id}`,
    }),
  }),
});

// export endpoints
export const { useGetAllTeamMembersQuery, useGetSingleTeamMemberQuery } =
  teamApiSlice;

// export team api slice
export default teamApiSlice;
