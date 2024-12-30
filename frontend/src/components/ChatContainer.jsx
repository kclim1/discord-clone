import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMessagesStore } from "../../store/useMessagesStore";
import axios from "axios";

export const ChatContainer = () => {
  const { chatId } = useParams(); // Destructure `chatId` from `useParams`
  const { messages, setMessages } = useMessagesStore(); // Destructure `setMessages` from the store

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/messages/${chatId}`,
          {
            headers: { profileId: "your-profile-id-here" }, // Replace with actual profileId
          }
        );

        console.log("Fetched messages response:", response.data);

        // Extract and set messages
        setMessages(response.data.allMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error.message);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId, setMessages]);

  return (
    <div className="chat-container w-full h-[85vh] flex flex-col">
      {/* Messages Container */}
      <div className="chat-messages flex-grow px-7 py-2 overflow-y-auto">
        {messages && messages.length > 0 ? (
          messages.map((message) => {
            console.log("Message object:", message); // Log the message object
            return (
              <div key={message._id} className="message flex items-start mb-4">
                {/* Display Sender's Profile Picture */}
                <img
                  src={message.sender?.profilePic || "/avatar.png"} // Use sender field in the message
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
            );
          })
        ) : (
          <p className="text-gray-400">No messages yet.</p>
        )}
      </div>
    </div>
  );
};
