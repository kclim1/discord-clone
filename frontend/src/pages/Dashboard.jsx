import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";

export const Dashboard = () => {
  const location = useLocation();

  const isProfilePage = location.pathname === "/dashboard/profile";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-grow ">
        <Sidebar className="w-[20%] h-full bg-gray-800 text-white" />
        
        <div className="chat flex-grow bg-slate-500  ">
          {isProfilePage ? (
            <div className="w-full h-full ">
              <Outlet />
            </div>
          ) : (
            <>
              <h1>Chat Dashboard</h1>
              {/* add chat related stuff here */}
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
