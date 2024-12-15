import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MicIcon from "@mui/icons-material/Mic";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import {  useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const UserFooter = () => {
    const {profileId} = useParams()
  const navigate = useNavigate();
  const handleClick = () => {
    console.log(profileId)
    navigate(`/dashboard/${profileId}/profile`);
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between p-3 bg-[#292b2f] text-white "
    >
      <Tooltip title="Profile Page">
        <div className="flex items-center space-x-3 hover:bg-slate-400 pr-2">
          <AccountCircleIcon className="w-10 h-10" />
          <div className="leading-tight">
            <p className="text-sm font-semibold">Username</p>
            <p className="text-xs text-gray-400">#0000</p>
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
          <Tooltip title="Add Friend">
            <ManageAccountsIcon className="text-gray-300" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
