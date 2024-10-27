import { useState } from "react";
import { useCreateUserMutation } from "../../app/api/apiSlice.js";
import UserList from "./UserList.jsx";

const User = () => {
  //   get single user
  //   const { data, isError, isSuccess, isLoading, error } = useGetUserByIdQuery(
  //     "671dba7ac09975f0c740cdd6"
  //   );

  //   if (isLoading) {
  //     // return <h1>Loading...</h1>;
  //     console.log("Loading . . . . ");
  //   }
  //   if (isError) {
  //     console.log(error);
  //   }
  //   if (isSuccess) {
  //     console.log(data);
  //   }

  const [createUser, { data, isError, isSuccess, isLoading, error }] =
    useCreateUserMutation();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isError) {
    console.log(error);
  }
  if (isSuccess) {
    console.log(data);
  }
  if (isLoading) {
    console.log("Loading . . . . ");
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createUser(input);
  };

  return (
    <>
      <div className="">
        {" "}
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={handleInputChange}
          />
          <button type="submit">Create</button>
        </form>
        <div className="useList">
          <UserList />
        </div>
      </div>
    </>
  );
};

export default User;
