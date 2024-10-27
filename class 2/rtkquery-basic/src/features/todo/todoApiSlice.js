import apiSlice from "../../app/api/apiSlice.js";

// create todo api slice

const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({}),
});

// export todo api slice
export default todoApiSlice;
