import ChatIcon from "@mui/icons-material/Chat";
import { PurpleTooltip, IconWrapper } from "./PurpleTooltip";
import { ServerIconTooltip, ServerIconWrapper } from "./AddServerIcon";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const ServerListSidebar = () => {
  return (
    <div className="w-[25%] bg-slate-950 flex flex-col   items-center h-full py-4">
      <PurpleTooltip title="Direct Messsages" placement="right">
        <IconWrapper>
          <ChatIcon style={{ fontSize: "48px" }} />
        </IconWrapper>
      </PurpleTooltip>
      <hr className="w-3/4 border-t-2 border-white mt-3 py-2" />

      <div className="flex flex-col items-center gap-3 my-3 serverIcons bg-red-300 ">
        <p className="text-white">Server icons here</p>
        <p className="text-white">Server icons here</p>
        <p className="text-white">Server icons here</p>
        <p className="text-white">Server icons here</p>
        {/* Example Server Icon */}
        {/* Add more server icons dynamically here */}
      </div>
      <ServerIconTooltip title="Add a server">
        <ServerIconWrapper>
          <AddCircleIcon style={{ fontSize: "48px" }} />
        </ServerIconWrapper>
      </ServerIconTooltip>
    </div>
  );
};
