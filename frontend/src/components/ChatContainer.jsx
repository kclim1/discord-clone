import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMessagesStore } from "../../store/useMessagesStore";
import axios from "axios";

export const ChatContainer = () => {
  const { chatId , profileId } = useParams(); // Destructure `chatId` from `useParams`
  const { messages, setMessages } = useMessagesStore(); // Destructure `setMessages` from the store
  const [user, setUser] = useState(null); // State to store user information

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/messages/${chatId}`,
          {
            headers: { profileId }, // Replace with your actual profileId
          }
        );

        console.log("Fetched messages response:", response.data);

        // Extract user and allMessages
        const { user, allMessages } = response.data;

        // Store them separately for better clarity
        setUser(user);
        setMessages(allMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error.message);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId, setMessages,profileId]);


  useEffect(()=>{
    console.log('this is user',user)
  },[user])

  return (
    <div className="chat-container w-full h-full">
      <div className="chat-messages w-full h-full overflow-y-auto px-7 py-2">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} className="message flex items-start mb-4">
              <img
                src={user.profilePic || "/avatar.png"} // Use optional chaining for safety
                alt={`${user.username}'s profile`} // Use optional chaining for safety
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-white">
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
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
