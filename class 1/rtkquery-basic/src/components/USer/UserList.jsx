import { useGetAllUsersQuery } from "../../app/api/apiSlice.js";

const UserList = () => {
  // get all users
  const { data, isError, isSuccess, isLoading, error } = useGetAllUsersQuery();

  let content = "";

  if (isLoading) {
    content = <h1>Loading...</h1>;
  }

  if (isError) {
    content = <h1>{error.error}</h1>;
  }

  if (isSuccess) {
    content = data?.map((user) => (
      <li className="userLi" key={user._id}>
        {user.name}
      </li>
    ));
  }

  return <>{content}</>;
};

export default UserList;
