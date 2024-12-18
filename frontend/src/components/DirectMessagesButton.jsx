import ChatIcon from "@mui/icons-material/Chat";
import { PurpleTooltip, IconWrapper } from "./PurpleTooltip";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export const DirectMessagesButton = () => {
  const {profileId} = useParams()
  const navigate = useNavigate();
  const handleClick = () => {
    // navigate("dashboard/:profileId/direct-messages/:dmId");
    navigate(`/dashboard/${profileId}/direct-messages`);
   
  };

  return (
    <div onClick={handleClick}>
      <PurpleTooltip title="Direct Messsages" placement="right">
        <IconWrapper>
          <ChatIcon style={{ fontSize: "48px" }} />
        </IconWrapper>
      </PurpleTooltip>
    </div>
  );
};
