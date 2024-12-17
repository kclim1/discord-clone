import { Outlet, useLocation, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { ServerListSidebar } from "../components/ServerListSidebar";
import { UserFooter } from "../components/UserFooter";
import { useEffect } from "react";
import { useProfileStore } from "../../store/useProfileStore";
import { fetchProfile } from "../../utils/fetchProfile";
import { Toaster } from "sonner";
import { InputWithEmoji } from "../components/InputWithEmoji";

export const Dashboard = () => {
  const { loading } = useProfileStore();
  const { profileId } = useParams();
  const location = useLocation();
  const isProfilePage = location.pathname === `/dashboard/${profileId}/profile`;
  useEffect(() => {
    if (profileId) {
      fetchProfile(profileId);
    }
  }, [profileId]);

  return (
    <div className="header-container flex flex-col h-screen overflow-hidden">
      <Header />
      <Toaster />
      <div className="dashboard-container flex overflow-hidden">
        <ServerListSidebar />
        <div className="channel-container flex flex-col justify-between bg-[#2f3136]">
          <div className="text-channels bg-[#2f3136] text-white flex-grow ">
            #text channels
          </div>
          <UserFooter />
        </div>
        <div className=" bg-[#36393f]  text-white flex flex-col flex-grow justify-between">
          <div className="chat-container flex flex-grow  mx-8 bg-green-400">
            {isProfilePage ? (
              loading ? (
                <div className="flex items-center justify-center w-full h-full">
                  {/* Render your loading component */}
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="w-full h-full">
                  <Outlet />
                </div>
              )
            ) : (
              <div>
                <h1>Chat Dashboard</h1>
              </div>
            )}
          </div>
            <InputWithEmoji />
        </div>
        <div className="bg-[#2C2F33] w-[10%] text-white truncate">
          Kiss me through the phone
        </div>
      </div>
    </div>
  );
};
