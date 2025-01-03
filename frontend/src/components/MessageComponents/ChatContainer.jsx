import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMessagesStore } from "../../../store/useMessagesStore";
import { useSocketStore } from "../../../store/useSocketStore";
import axios from "axios";

export const ChatContainer = () => {
  const { chatId, profileId } = useParams(); // Get `chatId` and `profileId` from URL
  const { messages, setMessages, addMessage } = useMessagesStore(); // Zustand store for messages
  const { addSocketHandler, removeSocketHandler, isConnected } = useSocketStore(); // Socket functions

  // Fetch messages when chatId changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_ROUTE}/${chatId}`,
          {
            headers: { profileId }, // Pass the profileId in the headers
          }
        );


        // Set fetched messages to Zustand store
        setMessages(response.data.allMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error.message);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId, setMessages, profileId]);

  // Listen for real-time message events
  useEffect(() => {
    const handleMessageSent = (message) => {
      // Only update messages if the new message belongs to the current chat
      if (message.chatId === chatId) {
        addMessage(message);
      }
    };

    if (isConnected) {
      addSocketHandler("messageSent", handleMessageSent);
    }

    // Cleanup the listener on unmount
    return () => {
      if (isConnected) {
        removeSocketHandler("messageSent", handleMessageSent);
      }
    };
  }, [isConnected, chatId, addMessage, addSocketHandler, removeSocketHandler]);

  return (
    <div className="chat-container w-full h-[85vh] flex flex-col">
      {/* Messages Container */}
      <div className="chat-messages flex-grow px-7 py-2 overflow-y-auto">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} className="message flex items-start mb-4">
              {/* Display Sender's Profile Picture */}
              <img
                src={message.sender?.profilePic || "/avatar.png"} // Use `sender` field in the message
                alt={`${message.sender?.username || "Unknown Sender"}'s profile`}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="flex items-center">
                  {/* Display Sender's Username */}
                  <span className="text-sm font-bold text-white">
                    {message.sender?.username || "Unknown Sender"}
                  </span>
                  {/* Display Message Timestamp */}
                  <span className="text-xs text-gray-400 ml-2">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {/* Display Message Text */}
                <p className="text-sm text-white">{message.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No messages yet.</p>
        )}
      </div>
    </div>
  );
};
