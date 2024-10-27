import { useParams } from "react-router-dom";
import { useGetSingleTeamMemberQuery } from "./teamApiSlice.js";

const SingleTeam = () => {
  const { id } = useParams();
  const { data, isError, isSuccess, isLoading, error } =
    useGetSingleTeamMemberQuery(id);

  let content = "";
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }
  if (isSuccess) {
    content = (
      <div>
        <h2>Name: {data.name}</h2>
        <p>Email: {data.email}</p>
      </div>
    );
  }

  return <>{content}</>;
};

export default SingleTeam;
