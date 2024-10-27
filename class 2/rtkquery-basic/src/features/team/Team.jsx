import { Link } from "react-router-dom";
import "./Team.css";
import {
  useCreateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetAllTeamMembersQuery,
} from "./teamApiSlice.js";
import { useState } from "react";

const Team = () => {
  // get all tem members
  const { data, isError, isLoading, isSuccess, error } =
    useGetAllTeamMembersQuery(null, {
      refetchOnMountOrArgChange: 60,
    });
  // delete a team member
  const [deleteTeamMember] = useDeleteTeamMemberMutation();

  let content = "";

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    content = data.map((member, index) => {
      return (
        <div className="teamListBox" key={index}>
          <h2>
            <Link to={`/team/${member._id}`}>Name: {member.name}</Link>
          </h2>
          <p>Email: {member.email}</p>
          <button onClick={() => deleteTeamMember(member._id)}>Delete</button>
        </div>
      );
    });
  }

  // create a new team member

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [
    createTeamMember,
    {
      data: createData,
      isError: createIsError,
      isLoading: createLoading,
      isSuccess: createSuccess,
      error: createError,
    },
  ] = useCreateTeamMemberMutation();

  if (createLoading) {
    content = <p>Loading...</p>;
  }
  if (createIsError) {
    console.log(createError?.data?.message);
  }
  if (createSuccess) {
    console.log(createData);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createTeamMember(input);
  };

  return (
    <>
      <h1>Add New Team</h1>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={input.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
      <hr />
      <div className="teamList">{content}</div>
    </>
  );
};

export default Team;
