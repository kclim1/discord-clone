import PersonIcon from "@mui/icons-material/Person";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const FriendListIcon = () => {
//   const {profileId} = useNavigate()
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick((prev) => !prev);
  };
  return (
    <div
      onClick={handleClick}
      className={`text-center text-xl flex  space-x-2 p-2 m-4 hover:bg-gray-600 rounded-lg focus:bg-grey-600 ${
        click ? "bg-gray-600" : ""
      }
`}
    >
      <PersonIcon />
      <p>Friends</p>
    </div>
  );
};
