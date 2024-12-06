import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Sidebar } from "../components/Sidebar";

export const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-grow">
        <Sidebar className=" h-full bg-gray-800 text-white" />
        <div className="flex-grow bg-slate-500 ">
          <h1>Dashboard here</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};
