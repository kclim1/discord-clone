import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { ServerListSidebar } from "../components/ServerListSidebar";
import { UserFooter } from "../components/UserFooter";
import { Toaster } from "sonner";
import { DirectMessageList } from "../components/DirectMessageList";
import { useEffect } from "react";
import { fetchProfile } from "../../utils/fetchProfile";
import { useParams } from "react-router-dom";
import { useSocketStore } from "../../store/useSocketStore";
import { useFriendsStore } from "../../store/useFriendsStore";

export const Dashboard = () => {
  const connectSocket = useSocketStore((state) => state.connectSocket); //extracts  the connection function
  const disconnectSocket = useSocketStore((state) => state.disconnectSocket); // extracts function to handle disocnnect
  const {setSenderId } = useFriendsStore()

  const { profileId } = useParams();
  

  useEffect(() => {
    if (profileId) {
      setSenderId(profileId)
      fetchProfile(profileId);
      console.log("Connecting socket...");
      connectSocket();

      return () => {
        console.log("Disconnecting socket...");
        disconnectSocket();
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

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
