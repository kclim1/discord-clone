import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Misc/Header";
// import { ServerListSidebar } from "../components/ServerListSidebar";
import { UserFooter } from "../components/UserFooter";
import { Toaster } from "sonner";
import { DirectMessageList } from "../components/MessageComponents/DirectMessageList";
import { fetchProfile } from "../../utils/fetchProfile";
import { fetchFriends } from "../../utils/fetchFriends"; // Import fetchFriends
import { useParams } from "react-router-dom";
import { useFriendListStore } from "../../store/useFriendListStore"; // Zustand store for friend list
import { useFriendsStore } from "../../store/useFriendsStore";
import { fetchChat } from "../../utils/fetchChat";
import { useFetchChatStore } from "../../store/useFetchChatStore";
import { useSocketStore } from "../../store/useSocketStore";

export const Dashboard = () => {
  const { isConnected, connectSocket, disconnectSocket, registerSocket } = useSocketStore(); 
  const { setFriendList } = useFriendListStore(); // Zustand store for friend list
  const { setSenderId } = useFriendsStore();
  const { setChats } = useFetchChatStore(); // Zustand store to manage chat state
  const { profileId } = useParams();

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);

  useEffect(() => {
    if (profileId) {
      setSenderId(profileId);
      fetchProfile(profileId);
      if (isConnected) {
        registerSocket(profileId);
      }
    }
  }, [profileId, isConnected, registerSocket, setSenderId]);

  useEffect(() => {
    if (profileId) {
      const loadChats = async () => {
        try {
          const chats = await fetchChat(profileId); // Fetch chats from backend
          setChats(chats); // Update chats in Zustand store
        } catch (error) {
          console.error("Error fetching chats:", error.message);
        }
      };
      loadChats();
    }
  }, [profileId, setChats]);

  useEffect(() => {
    if (profileId) {
      const loadFriends = async () => {
        try {
          const fetchedFriends = await fetchFriends(profileId);
          setFriendList(Array.isArray(fetchedFriends) ? fetchedFriends : []);
        } catch (error) {
          console.error("Failed to load friends:", error);
        }
      };
      loadFriends(); // Automatically set global friend list state on dashboard load
    }
  }, [profileId, setFriendList]);

  return (
    <div className="header-container flex flex-col h-screen overflow-hidden">
      <Header />
      <Toaster />
      <div className="dashboard-container flex overflow-hidden h-screen">
        {/* <ServerListSidebar /> */}
        <div className="channel-container flex flex-col justify-between bg-[#2f3136]">
          <div className="text-channels bg-[#2f3136] text-white flex-grow ">
            <DirectMessageList />
          </div>
          <UserFooter />
        </div>
        <div className="bg-[#36393f] text-white flex flex-col flex-grow justify-between">
          <div className="chat-container flex flex-grow ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
