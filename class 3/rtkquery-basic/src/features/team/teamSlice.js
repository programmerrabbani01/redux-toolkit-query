import { createSlice } from "@reduxjs/toolkit";

// create team slice

export const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [],
  },
  reducers: {
    getAllTeamMembers: (state, action) => {
      state.teams = action.payload;
    },
  },
});

// export team slice actions
export const { getAllTeamMembers } = teamSlice.actions;

// export team slice reducer
export default teamSlice.reducer;
