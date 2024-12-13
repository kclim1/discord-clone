import ChatIcon from "@mui/icons-material/Chat";
import { PurpleTooltip, IconWrapper } from "./PurpleTooltip";
import { ServerIconTooltip, ServerIconWrapper } from "./AddServerIcon";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ServerIcons } from "./ServerIcons";

export const ServerListSidebar = () => {
  return (
    <div className="w-[25%] bg-slate-950 flex flex-col   items-center h-full py-4  iconContainer">
      <PurpleTooltip title="Direct Messsages" placement="right">
        <IconWrapper>
          <ChatIcon style={{ fontSize: "48px" }} />
        </IconWrapper>
      </PurpleTooltip>
      <hr className="w-3/4 border-t-2 border-white mt-3 py-2" />

      <div className="flex flex-col items-center gap-3 my-3 serverIcons overflow-y-auto h-screen w-full scrollbar-hide "  style={{
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For IE and Edge
  }}>
        
        {/* Example Server Icon */}
        <ServerIcons/>
        <ServerIcons/>
        
        
        {/* Add more server icons dynamically here */}
      </div>
      <ServerIconTooltip title="Add a server"  placement="right">
        <ServerIconWrapper>
          <AddCircleIcon style={{ fontSize: "48px" , marginBottom: "32px"}} />
        </ServerIconWrapper>
      </ServerIconTooltip>
    </div>
  );
};
