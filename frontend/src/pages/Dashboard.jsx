import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export const Dashboard = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/dashboard/profile";

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-grow">
        <Sidebar className="w-[20%] text-white bg-red-800 h-screen" />
        <div className="chat flex-grow bg-slate-500">
          {isProfilePage ? (
            <div className="w-full h-full">
              <Outlet />
            </div>
          ) : (
            <div>
              <h1>Chat Dashboard</h1>
              {/* add chat related stuff here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
