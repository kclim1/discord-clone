/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchOneFriend } from "../../../utils/fetchOneFriend";

export const ChatUI = ({ chat, onClick, isSelected }) => {
  const { profileId } = useParams();
  const [otherParticipant, setOtherParticipant] = useState(null);

  // Safety check to ensure chat.participants exists and is an array
  const otherParticipantId = Array.isArray(chat?.participants)
    ? chat.participants.find((id) => id !== profileId)
    : null;

  useEffect(() => {
    if (otherParticipantId) {
      fetchOneFriend(profileId, otherParticipantId)
        .then((participant) => {
          setOtherParticipant(participant);
        })
        .catch((error) => {
          console.error("Error fetching participant profile:", error.message);
        });
    }
  }, [profileId, otherParticipantId]);

  if (!otherParticipantId) {
    return null; // Render nothing if participants array is invalid
  }

  return (
    <div
      className={`flex items-center p-2 mb-2 mx-2 rounded-lg cursor-pointer ${
        isSelected ? "bg-gray-700" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center w-full p-2 rounded-md hover:bg-gray-600">
        <img
          className="w-10 h-10 rounded-full mx-3"
          src={otherParticipant?.profilePic || "/avatar.png"}
          alt={`${otherParticipant?.username || "Unknown User"}'s profile`}
        />
        <span className="text-white text-lg">
          {otherParticipant?.username || "Unknown User"}
        </span>
      </div>
    </div>
  );
};
