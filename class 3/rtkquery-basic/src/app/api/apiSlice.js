import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create api slice

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5050" }),
  tagTypes: ["Teams", "Team"],
  endpoints: (builder) => ({}),
});

// export api slice
export default apiSlice;
