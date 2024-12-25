import { FriendListIcon } from "./FriendListIcon";
import { NewDirectMessage } from "./NewDirectMessages";
// import { fetchSession } from '../../utils/fetchSession';
// import { useEffect } from 'react';
// import { OnlineIndicator } from './OnlineIndicator';
// import { OfflineIndicator } from './OfflineIndicator';
// import { fetchChat } from "../../utils/fetchChat";
// import { useEffect } from "react";
import { ChatUI } from "./FriendPageComponents/ChatUI";

export const DirectMessageList = () => {
 

  return (
    <div>
      <FriendListIcon />
      <NewDirectMessage />
      <ChatUI/>
    </div>
  );
};

// this is the list that displays who your friends are and who you are chatting with
// friends list basically
