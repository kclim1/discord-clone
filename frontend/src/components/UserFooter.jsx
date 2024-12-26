import MicIcon from "@mui/icons-material/Mic";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import { useParams, useNavigate } from "react-router-dom";
import { AddFriendDialog } from "./AddFriendDialog";
import { useProfileStore } from "../../store/useProfileStore";

export const UserFooter = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const { user } = useProfileStore(); // Access user from Zustand store

  const handleClick = () => {
    console.log(profileId);
    navigate(`/dashboard/${profileId}/profile`);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-[#292b2f] text-white ">
      <Tooltip title="Profile Page">
        <div
          onClick={handleClick}
          className="flex items-center space-x-3 hover:bg-slate-400 pr-2 rounded-md"
        >
          {/* Conditionally render profile picture or default icon */}
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <AccountCircleIcon className="w-10 h-10" />
          )}
          <div
            className="leading-tight w-[80px] min-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap"
            
          >
            {/* Username with truncation */}
            <p className="text-sm font-semibold truncate">
              {user.username || "Username"}
            </p>
          </div>
        </div>
      </Tooltip>

      {/* Right side: Mic, Headphones, and Manage Account icons */}
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded hover:bg-slate-400 cursor-pointer">
          <Tooltip title="Mute">
            <MicIcon className="text-gray-300" />
          </Tooltip>
        </div>
        <div className="p-2 rounded hover:bg-slate-400 cursor-pointer">
          <Tooltip title="Deafen">
            <HeadphonesIcon className="text-gray-300" />
          </Tooltip>
        </div>
        <div className="p-2 rounded hover:bg-slate-400 cursor-pointer">
          <AddFriendDialog />
        </div>
      </div>
    </div>
  );
};
