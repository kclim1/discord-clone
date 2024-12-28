import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../../utils/toastUtil";
import { useCreateChatStore } from "../../../store/useCreateChatStore";
import { useFriendListStore } from "../../../store/useFriendListStore";
// import {useFriendsStore} from '../../../store/useFriendsStore'

export const AddOnePerson = () => {
  const [friendId, setFriendId] = useState("");
  const { profileId } = useParams();
  const { closeAddOnePerson } = useCreateChatStore();
  const { setFriendList } = useFriendListStore();
  const navigate = useNavigate();
  // const {setSenderId} = useFriendsStore()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const participants = [friendId, profileId];
      console.log("Sending to backend:", participants);

      const response = await axios.post("http://localhost:3000/new-chat", {
        participants,
      });
      const newFriendRequest = response.data;
      // setSenderId(response.data.senderId)
      if (response.status === 201) {
        const { chat } = response.data;
        setFriendList((prev) => [...prev, newFriendRequest]);
        showSuccessToast("Chat Created!");
        navigate(`/dashboard/${profileId}/direct-messages/${chat.chatId}`);
        console.log("Chat Created!", response.data);
        closeAddOnePerson();
      }
    } catch (error) {
      console.error("Error creating chat:", error.message);
      showErrorToast("Failed to create chat!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[500px] bg-[#36393f] p-6 rounded-lg shadow-xl text-white">
        <h2 className="text-xl font-semibold mb-4">Add One Person</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium text-[#b9bbbe]" htmlFor="friendInput">
            Friend ID
          </label>
          <input
            id="friendInput"
            type="text"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
            className="border border-[#202225] bg-[#202225] rounded px-3 py-2 w-full 
                       text-[#dcddde] placeholder-[#72767d] focus:outline-none 
                       focus:ring-2 focus:ring-[#5865F2] hover:border-[#5865F2]"
            placeholder="Enter Friend ID (e.g., 141093256)"
          />
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent bubbling
                console.log("Cancel button clicked");
                closeAddOnePerson();
              }}
              className="px-4 py-2 bg-[#4f545c] text-white rounded hover:bg-[#40444b] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#5865F2] text-white rounded hover:bg-[#4752c4] transition-all"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
