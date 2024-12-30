import ChatIcon from "@mui/icons-material/Chat";
import { PurpleTooltip, IconWrapper } from "../PurpleTooltip";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const DirectMessagesButton = () => {
  const { profileId } = useParams();

  return (
    <div className="flex justify-center">
      <PurpleTooltip title="Direct Messages" placement="right">
        <Link
          to={`/dashboard/${profileId}/friends`}
          className="text-center text-sm flex items-center justify-center p-1 hover:bg-gray-600 rounded-full my-2 mx-6"
          style={{ width: "30px", height: "30px" }} // Ensures a compact, circular button
        >
          <IconWrapper>
            <ChatIcon style={{ fontSize: "42px" }} /> {/* Reduced size */}
          </IconWrapper>
        </Link>
      </PurpleTooltip>
    </div>
  );
};
