import { FriendListIcon } from "../FriendListIcon";
import { NewDirectMessage } from "./NewDirectMessages";
import { ChatUI } from "../FriendPageComponents/ChatUI";
import { useFetchChatStore } from "../../../store/useFetchChatStore";
import { useSocketStore } from "../../../store/useSocketStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { fetchChat } from "../../../utils/fetchChat";

export const DirectMessageList = () => {
  const { chats, addChat, setChats } = useFetchChatStore();
  const { addSocketHandler, removeSocketHandler, isConnected } = useSocketStore();
  const navigate = useNavigate();
  const { profileId, chatId } = useParams();

  // 1. Function to fetch all chats (like loadFriends)
  const loadChats = useCallback(async () => {
    try {
      const fetchedChats = await fetchChat(profileId);
      setChats(Array.isArray(fetchedChats) ? fetchedChats : []);
    } catch (error) {
      console.error("Failed to load chats:", error);
    }
  }, [profileId, setChats]);

  // 2. Fetch chats on mount or when profileId changes
  useEffect(() => {
    if (profileId) {
      loadChats();
    }
  }, [profileId, loadChats]);

  // 3. Listen for real-time "newChatCreated" event (similar to friendRequestReceived)
  useEffect(() => {
    const handleNewChat = (chat) => {
      console.log("New chat received:", chat);
      addChat(chat); // Update Zustand store with the new chat
      loadChats()
    };

    if (isConnected) {
      addSocketHandler("newChatCreated", handleNewChat);
    }
    return () => {
      if (isConnected) {
        removeSocketHandler("newChatCreated", handleNewChat);
      }
    };
  }, [isConnected, addSocketHandler, removeSocketHandler, loadChats , addChat ]);

  const handleChatClick = (chatId) => {
    navigate(`/dashboard/${profileId}/direct-messages/${chatId}`);
  };

  // 4. Render chat list
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
