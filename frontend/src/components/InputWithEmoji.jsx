import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send"; // Import the Send icon
import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useMessagesStore } from "../../store/useMessagesStore";
import { useProfileStore } from "../../store/useProfileStore";

export const InputWithEmoji = () => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const textAreaRef = useRef(null); // Ref for textarea
  const { profileId, chatId } = useParams();
  const addMessage = useMessagesStore((state) => state.addMessage);
  const {username , profilePic} = useProfileStore()

  // Adjust textarea height dynamically
  const adjustHeight = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  // Handle emoji click and close picker
  const onEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji.emoji); // Add emoji to message
    setIsOpen(false); // Close emoji picker
  };

  // Toggle emoji picker
  const toggleEmojiPicker = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await axios.post("http://localhost:3000/messages", {
        text: message, // The message text
        senderId: profileId, // Assuming you have the sender's profileId
        chatId, // Assuming chatId is available from useParams or props
        profilePic,
        username
      });

      console.log("Message sent successfully:", response.data);

      // Optionally update state or UI with the new message
      addMessage(response.data.newMessage); // Assuming you use Zustand for managing messages
      console.log(response.data.newMessage)
      // Clear the message input
      setMessage("");
      adjustHeight(); // Reset the textarea height
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };
 

  return (
    <div className="relative pb-8"> {/* Added mb-8 for bottom margin */}
      {/* Form wrapping the input container */}
      <form
        onSubmit={handleSubmit} // Call handleSubmit here correctly
        className="flex bg-[#40444b] rounded-lg focus-within:ring-2 focus-within:ring-[#5865F2] mx-4 mb-3 mt-2 items-center"
      >
        {/* Input Field */}
        <textarea
          ref={textAreaRef}
          value={message}
          onChange={(event) => {
            handleChange(event);
            adjustHeight();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault(); // Prevent adding a new line
              handleSubmit(event); // Trigger the form submission logic
            }
          }}
          className="flex-1 p-3 text-[#b9bbbe] bg-transparent outline-none resize-none rounded-md h-12 max-h-48 overflow-y-auto leading-[1.5] scrollbar-thin scrollbar-thumb-[#2c2f33] scrollbar-track-transparent placeholder-[#72767d]"
          placeholder="Send a message..."
          rows="1"
        />

        {/* Emoji Icon */}
        <button
          type="button"
          onClick={toggleEmojiPicker}
          className="text-[#b9bbbe] hover:text-[#ffffff] focus:outline-none pr-2"
        >
          <EmojiEmotionsIcon fontSize="medium" />
        </button>

        {/* Send Icon */}
        <button
          type="submit"
          className="text-[#b9bbbe] hover:text-[#ffffff] focus:outline-none pr-4"
        >
          <SendIcon fontSize="medium" />
        </button>
      </form>

      {/* Emoji Picker */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 z-16 bg-[#2f3136] shadow-md rounded-md max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#2c2f33] scrollbar-track-transparent">
          <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
        </div>
      )}
    </div>
  );
};
