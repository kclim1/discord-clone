import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { ServerListSidebar } from "../components/ServerListSidebar";
import { UserFooter } from "../components/UserFooter";
import { User } from "lucide-react";

export const Dashboard = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/dashboard/profile";
  return (
    <div className="header-container flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="dashboard-container flex overflow-hidden">
        <ServerListSidebar/>
        <div className="channel-container flex flex-col justify-between bg-[#2f3136]">
            <div className="text-channels bg-[#2f3136] text-white flex-grow ">
              #text channels
            </div>
            <UserFooter/>
        </div>
        <div className=" bg-[#36393f]  text-white flex flex-col flex-grow justify-between">
          <div className="chat-container ">
          {isProfilePage && (
          <div className="w-full h-full">
            <Outlet />
          </div>
          )}
          Chat container
          </div>
          
          <input className="m-8 p-4 rounded-lg h-8 text-[#b9bbbe] bg-[#40444b]" placeholder="Send a message..."/>
        </div>
      </div>
    </div>
  );
};

// return (
//   <div className="h-screen flex flex-col overflow-hidden">
//     <Header />
//     <div className="flex flex-grow bg-green-400">
//       {/* <ServerListSidebar/> */}
//       <UserFooter/>
//       <div className="chat flex-grow bg-slate-500">
//         {isProfilePage ? (
//           <div className="w-full h-full">
//             <Outlet />
//           </div>
//         ) : (
//           <div>
//             <h1>Chat Dashboard</h1>
//             {/* add chat related stuff here */}
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// );
