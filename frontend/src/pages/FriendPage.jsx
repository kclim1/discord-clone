import { useEffect } from "react";
import { fetchFriends } from "../../utils/fetchFriends";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFriendListStore } from "../../store/useFriendListStore";
import { useSocketStore } from "../../store/useSocketStore";

import { showSuccessToast } from "../../utils/toastUtil";

export const FriendPage = () => {
  const { isConnected, addSocketHandler, removeSocketHandler } = useSocketStore();
  const { setFriendList, friendList } = useFriendListStore(); // Global state for friend list
  const { profileId } = useParams(); // Current user's profile ID

  const loadFriends = async () => {
    try {
      const fetchedFriends = await fetchFriends(profileId);
      setFriendList(Array.isArray(fetchedFriends) ? fetchedFriends : []);
    } catch (error) {
      console.error("Failed to load friends:", error);
    }
  };

  useEffect(() => {
    if (profileId) {
      loadFriends();
    }
  }, [profileId]);

  useEffect(() => {
    const handleFriendRequest = (data) => {
      showSuccessToast("Friend request received!");
      loadFriends(); // Re-fetch friends list on new request
    };

    if (isConnected) {
      addSocketHandler("friendRequestSent", handleFriendRequest);
    }

    return () => {
      if (isConnected) {
        removeSocketHandler("friendRequestSent", handleFriendRequest);
      }
    };
  }, [isConnected, addSocketHandler, removeSocketHandler]);

  const handleAccept = async (friendId) => {
    try {
      await axios.patch(`http://localhost:3000/friends/${profileId}`, {
        friendId,
        status: "accepted",
      });
      console.log(`Friend request from ${friendId} accepted.`);
      loadFriends(); // Re-fetch updated friends list
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleReject = async (friendId) => {
    try {
      await axios.delete(`http://localhost:3000/friends/${profileId}`, {
        data: { friendId },
      });
      console.log(`Friend request from ${friendId} rejected.`);
      loadFriends(); // Re-fetch updated friends list
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  return (
    <div className="friend-page p-4 bg-[#3c3f43] text-white w-full h-full">
      <h1 className="text-2xl font-bold mb-4">Friends</h1>

      <div className="friend-requests mb-8">
        <h2 className="text-xl font-semibold mb-2">Pending Friend Requests</h2>
        <ul className="space-y-4">
          {(Array.isArray(friendList) ? friendList : [])
            .filter((friend) => friend.status === "pending")
            .map((friend) => (
              <li key={friend._id} className="flex items-center justify-between bg-[#3c3f43] p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={friend.profilePic || "/avatar.png"} alt="Profile" className="w-12 h-12 rounded-full" />
                  <span>{friend.username}</span>
                </div>
                {friend.receiverId === profileId && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAccept(friend.profileId)}
                      className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(friend.profileId)}
                      className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};