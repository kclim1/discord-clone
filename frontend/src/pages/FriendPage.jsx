import { useEffect, useCallback } from "react";
import { fetchFriends } from "../../utils/fetchFriends";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFriendListStore } from "../../store/useFriendListStore";
import { useSocketStore } from "../../store/useSocketStore";
// import { useFriendsStore } from "../../store/useFriendsStore";
import { showSuccessToast } from "../../utils/toastUtil";

export const FriendPage = () => {
  const { isConnected, addSocketHandler, removeSocketHandler } =
    useSocketStore();
  const { setFriendList, friendList } = useFriendListStore();
  const { profileId } = useParams();
  // const { receiverId, senderId } = useFriendsStore();

  // Memoize loadFriends to avoid re-creating it
  const loadFriends = useCallback(async () => {
    try {
      const fetchedFriends = await fetchFriends(profileId);
      setFriendList(Array.isArray(fetchedFriends) ? fetchedFriends : []);
    } catch (error) {
      console.error("Failed to load friends:", error);
    }
  }, [profileId, setFriendList]);



  // Fetch friends on component mount or when profileId changes
  useEffect(() => {
    if (profileId) {
      loadFriends();
    }
  }, [profileId, loadFriends]);

  // Add socket handler for real-time friend request updates
  useEffect(() => {
    const handleFriendRequest = () => {
      showSuccessToast("Friend request received!");
      loadFriends(); // Fetch updated friends after a new request
    };

    if (isConnected) {
      addSocketHandler("friendRequestSent", handleFriendRequest);
    }

    return () => {
      if (isConnected) {
        removeSocketHandler("friendRequestSent", handleFriendRequest);
      }
    };
  }, [isConnected, addSocketHandler, removeSocketHandler, loadFriends]);

  // Handle accept friend request
  const handleAccept = async (friendId) => {
    try {
      const response = await axios.patch(`http://localhost:3000/friends/${profileId}`, {
        friendId
      });
      if(response.status === 200){
        loadFriends(); 
        showSuccessToast("Friend request accepted!");
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  // Handle reject friend request
  const handleReject = async (friendId) => {
    try {
      await axios.delete(`http://localhost:3000/friends/${profileId}`, {
        data: { friendId },
      });
      showSuccessToast("Friend request rejected!");
      loadFriends(); // Re-fetch updated friends list
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  return (
    <div className="friend-page p-4 bg-[#3c3f43] text-white w-full h-full">
      <h1 className="text-2xl font-bold mb-4">Friends</h1>

      {/* Pending Friend Requests */}
      <div className="friend-requests mb-8">
        <h2 className="text-xl font-semibold mb-2">Pending Friend Requests</h2>
        <ul className="space-y-4">
          {(Array.isArray(friendList) ? friendList : [])
            .filter((friend) => friend.status === "pending")
            .map((friend) => (
              <li
                key={friend._id}
                className="flex items-center justify-between bg-[#3c3f43] p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={friend.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <span>{friend.username}</span>
                </div>
                {profileId === friend.receiverId ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={()=> handleAccept(friend._id)}
                      className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(friend._id)}
                      className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400">Request Pending</span>
                )}
              </li>
            ))}
        </ul>
      </div>

      {/* Accepted Friends */}
      <div className="accepted-friends">
        <h2 className="text-xl font-semibold mb-2">Accepted Friends</h2>
        <ul className="space-y-4">
          {(Array.isArray(friendList) ? friendList : [])
            .filter((friend) => friend.status === "accepted")
            .map((friend) => (
              <li
                key={friend._id}
                className="flex items-center justify-between bg-[#3c3f43] p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={friend.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <span>{friend.username}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
