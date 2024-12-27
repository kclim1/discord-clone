import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Replace these with your actual imports
import { useFriendListStore } from "../../../store/useFriendListStore"; 
import { showSuccessToast, showErrorToast } from "../../../utils/toastUtil";

export const AutoCompleteComponent = () => {
  const { profileId } = useParams(); // The current user's ID from the URL, e.g. /dashboard/:profileId
  const navigate = useNavigate();

  // Grab the list of friends from your Zustand store
  const friendList = useFriendListStore((state) => state.friendList);

  // Local state for the selected friends in React-Select
  const [selected, setSelected] = useState([]);

  // Convert friendList objects into { value, label } for React-Select
  const options = (friendList || []).map((friend) => ({
    value: friend.receiverId, 
    label: friend.username,
  }));

  // Called whenever the user picks or removes a friend in the dropdown
  const handleChange = (newValue) => {
    setSelected(newValue);
  };

  // Called when "Create Chat" is clicked
  const handleCreateChat = async () => {
    try {
      // Gather the selected friend IDs
      let participants = selected.map((item) => item.value);

      // Ensure we add the current user's profileId to the list
      if (!participants.includes(profileId)) {
        participants.push(profileId);
      }

      console.log("Sending participants to backend:", participants);

      // POST the participants to your backend
      const response = await axios.post("http://localhost:3000/new-chat", {
        participants,
      });

      // If the backend responds with 201, we assume a new chat is created
      if (response.status === 201) {
        showSuccessToast("Chat Created!");
        // Extract the chatId from the response
        const { chatId } = response.data;
        // Navigate to your chat page
        navigate(`/dashboard/${profileId}/direct-messages/${chatId}`);
      }
    } catch (error) {
      console.error("Error creating chat:", error.response?.data || error.message);
      showErrorToast("Oops! Couldn't create new chat");
    }
  };

  return (
    <div style={{ width: 400, padding: "1rem", backgroundColor: "#2f3136", borderRadius: 8 }}>
      <h2 style={{ color: "white", marginBottom: "0.5rem" }}>Create a Group Chat</h2>

      {/* React-Select for picking multiple friends */}
      <Select
        options={options}
        value={selected}
        onChange={handleChange}
        isMulti
        placeholder="Type or select a friend..."
      />

      <button
        onClick={handleCreateChat}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#5865f2",
          color: "#ffffff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Create Chat
      </button>
    </div>
  );
};
