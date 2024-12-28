import PersonIcon from "@mui/icons-material/Person";
import { Link, useParams } from "react-router-dom";

export const FriendListIcon = () => {
  const { profileId } = useParams();

  return (
    <Link
      to={`/dashboard/${profileId}/friends`}
      className="text-center text-xl flex space-x-2 p-2 m-4 hover:bg-gray-600 rounded-lg"
    >
      <PersonIcon />
      <p>Friends</p>
    </Link>
  );
};
