import { useEffect, useState } from "react";
import { fetchFriends } from "../../utils/fetchFriends";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFriendListStore } from "../../store/useFriendListStore";

export const FriendPage = () => {
  const {setFriendList , friendList } = useFriendListStore()
  const { profileId } = useParams(); // Current user's profile ID
  const [friends, setFriends] = useState([]); // State to store friends

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const fetchedFriends = await fetchFriends(profileId); // Fetch friends from backend
        setFriends(fetchedFriends); // Update state
        setFriendList(fetchedFriends) //global states 
      } catch (error) {
        console.error("Failed to load friends:", error);
      }
    };
    loadFriends();
  }, [profileId , setFriendList]);

  //used for debugging state
  useEffect(() => {
    console.log("useFriendListStore :", friendList);
  }, [friendList]);

  // Accept friend request
  const handleAccept = async (friendId) => {
    try {
      await axios.patch(`http://localhost:3000/friends/${profileId}`, {
        friendId,
        status: "accepted",
      });
    
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  // Reject friend request
  const handleReject = async (friendId) => {
    try {
      await axios.delete(`http://localhost:3000/friends/${profileId}`, {
        data: { friendId },
      });
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
          {friends
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
                {/* if you are receiver, render buttons.  */}
                {friend.receiverId === profileId && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAccept(friend._id)}
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
                )}
                {/* if you are sender, render request pending */}
                {friend.senderId === profileId && (
                  <div className="text-sm text-gray-400">Request Pending</div>
                )}
              </li>
            ))}
        </ul>
      </div>

      {/* Accepted Friends */}
      <div className="accepted-friends">
        <h2 className="text-xl font-semibold mb-2">Accepted Friends</h2>
        <ul className="space-y-4">
          {friends
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
                  <span>{friend.senderId || friend.receiverId}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
