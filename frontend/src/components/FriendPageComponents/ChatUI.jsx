/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchOneFriend } from "../../../utils/fetchOneFriend";

export const ChatUI = ({ chat, onClick }) => {
  // Get the current user's profileId from the URL params
  const { profileId } = useParams();
  console.log('this is chat',chat)
  // State to store the other participant's details
  const [otherParticipant, setOtherParticipant] = useState(null);

  // Find the other participant
  const otherParticipantId = chat.participants.find((id) => id !== profileId);
  

  useEffect(()=>{
    if(otherParticipantId){
      fetchOneFriend(profileId, otherParticipantId)
      .then((participant) => {
        setOtherParticipant(participant);
      })
      .catch((error) => {
        console.error("Error fetching participant profile:", error.message);
      });
    }
  },[profileId, otherParticipantId])

  return (
    <div
      className="flex items-center p-2 mb-2 mx-2 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center w-full p-2 rounded-md hover:bg-gray-600">
        <img
          className="w-10 h-10 rounded-full mx-3"
          src={otherParticipant?.profilePic || "/avatar.png"} // Use default avatar if no match found
          alt={`${otherParticipant?.username || "Unknown User"}'s profile`}
        />
        <span className="text-white text-lg">
          {otherParticipant?.username || "Unknown User"}
        </span>
      </div>
    </div>
  );
};
