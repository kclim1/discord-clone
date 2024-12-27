import { FriendListIcon } from "./FriendListIcon";
import { NewDirectMessage } from "./NewDirectMessages";
import { ChatUI } from "./FriendPageComponents/ChatUI";
import {useFetchChatStore} from '../../store/useFetchChatStore';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


export const DirectMessageList = () => {
  const { chats } = useFetchChatStore()
  const navigate = useNavigate();
  const { profileId } = useParams();
  const handleChatClick = (chatId) => {
    navigate(`/dashboard/${profileId}/direct-messages/${chatId}`);
  };
  return (
    <div>
      <FriendListIcon/>
      <NewDirectMessage/>
      {chats.map((chat) => (
        <ChatUI
          key={chat.chatId}
          chat={chat}
          onClick={() => handleChatClick(chat.chatId)}
        />
      ))}
    </div>
  )
  };


// const allParticipants = chats.flatMap(chat => chat.participants);

// console.log(allParticipants);

// [1] this is the req body { participants: [ '107202194291034125271', '141093256' ] }