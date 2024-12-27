import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { ServerListSidebar } from "../components/ServerListSidebar";
import { UserFooter } from "../components/UserFooter";
import { Toaster } from "sonner";
import { DirectMessageList } from "../components/DirectMessageList";
import { useEffect } from "react";
import { fetchProfile } from "../../utils/fetchProfile";
import { useParams } from "react-router-dom";
import { useFriendsStore } from "../../store/useFriendsStore";
import { fetchChat } from "../../utils/fetchChat";
import { useFetchChatStore } from "../../store/useFetchChatStore";
import { useSocketStore } from "../../store/useSocketStore";



export const Dashboard = () => {
  const {  connectSocket,  disconnectSocket } = useSocketStore(); // Extract the socket
  // const {  setFriendList } = useFriendListStore(); // Global friend state
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

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

  return (
    <div className="header-container flex flex-col h-screen overflow-hidden">
      <Header />
      <Toaster />
      <div className="dashboard-container flex overflow-hidden">
        <ServerListSidebar />
        <div className="channel-container flex flex-col justify-between bg-[#2f3136]">
          <div className="text-channels bg-[#2f3136] text-white flex-grow ">
            
            <DirectMessageList />
            {/* Other components like DirectMessageList */}
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
