import { FriendListIcon } from "./FriendListIcon";
import { NewDirectMessage } from "./NewDirectMessages";
import { ChatUI } from "./FriendPageComponents/ChatUI";
import { useFetchChatStore } from "../../store/useFetchChatStore";
import { useNavigate, useParams } from "react-router-dom";

export const DirectMessageList = () => {
  const { chats } = useFetchChatStore(); // Access chat state from Zustand store
  const navigate = useNavigate();
  const { profileId, chatId } = useParams(); // Get current profileId and chatId from the URL

  const handleChatClick = (chatId) => {
    navigate(`/dashboard/${profileId}/direct-messages/${chatId}`);
  };

  return (
    <div>
      <FriendListIcon />
      <NewDirectMessage />
      {chats.map((chat) => (
        <ChatUI
          key={chat.chatId}
          chat={chat}
          onClick={() => handleChatClick(chat.chatId)}
          isSelected={chat.chatId === chatId} 
        />
      ))}
    </div>
  );
};
