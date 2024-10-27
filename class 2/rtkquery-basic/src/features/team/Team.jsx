import { Link } from "react-router-dom";
import "./Team.css";
import { useGetAllTeamMembersQuery } from "./teamApiSlice.js";
import { useState } from "react";

const Team = () => {
  // get all tem members
  const { data, isError, isLoading, isSuccess, error } =
    useGetAllTeamMembersQuery();

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

  return (
    <>
      <h1>Add New Team</h1>
      <hr />
      <form action="">
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
