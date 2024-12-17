import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export const InputWithEmoji = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col gap-4 m-4">
      {/* Input Container */}
      <div className="flex items-center bg-[#40444b] rounded-lg focus-within:ring-2 focus-within:ring-[#5865F2] mx-4 mb-3 mt-2">
        {/* Input Field */}
        <textarea
          className="flex-1 p-3 text-[#b9bbbe] bg-transparent outline-none resize-none rounded-md h-12 leading-[1.5] scrollbar-thin scrollbar-thumb-[#2c2f33] scrollbar-track-transparent placeholder-[#72767d]"
          placeholder="Send a message..."
          rows="1" // Adjusts height dynamically
        />

        {/* Emoji Icon */}
        <button
          onClick={handleClick}
          className="text-[#b9bbbe] hover:text-[#ffffff] focus:outline-none pr-4"
        >
          <EmojiEmotionsIcon fontSize="medium" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute bottom-16 right-0 z-16 bg-[#2f3136] shadow-md rounded-md max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#2c2f33] scrollbar-track-transparent">
          <EmojiPicker theme="dark" />
        </div>
      )}
      
    </div>
  );
};
