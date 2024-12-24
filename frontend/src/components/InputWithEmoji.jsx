import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send"; // Import the Send icon
import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
// import axios from "axios";

export const InputWithEmoji = () => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const textAreaRef = useRef(null); // Ref for textarea

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

  return (
    <div className="relative flex flex-col gap-4 m-4">
      {/* Input Container */}
      <div className="flex bg-[#40444b] rounded-lg focus-within:ring-2 focus-within:ring-[#5865F2] mx-4 mb-3 mt-2 items-center">
        {/* Input Field */}
        <form>
          <textarea
            ref={textAreaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustHeight();
            }}
            className="flex-1 p-3 text-[#b9bbbe] bg-transparent outline-none resize-none rounded-md h-12 max-h-48 overflow-y-auto leading-[1.5] scrollbar-thin scrollbar-thumb-[#2c2f33] scrollbar-track-transparent placeholder-[#72767d]"
            placeholder="Send a message..."
            rows="1"
          />
        </form>

        {/* Emoji Icon */}
        <button
          onClick={toggleEmojiPicker}
          className="text-[#b9bbbe] hover:text-[#ffffff] focus:outline-none pr-2"
        >
          <EmojiEmotionsIcon fontSize="medium" />
        </button>

        {/* Send Icon */}
        <button
          onClick={() => {
            console.log("Message sent:", message);
            setMessage(""); // Clear the message
            adjustHeight(); // Reset textarea height
          }}
          className="text-[#b9bbbe] hover:text-[#ffffff] focus:outline-none pr-4"
        >
          <SendIcon fontSize="medium" />
        </button>
      </div>

      {/* Emoji Picker */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 z-16 bg-[#2f3136] shadow-md rounded-md max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#2c2f33] scrollbar-track-transparent">
          <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
        </div>
      )}
    </div>
  );
};
