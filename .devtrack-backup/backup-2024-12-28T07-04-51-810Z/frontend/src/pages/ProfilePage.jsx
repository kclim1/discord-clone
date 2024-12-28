import { UpdateProfileForm } from "../components/UpdateProfileForm";
import { X } from "lucide-react";
import { PictureUploadForm } from "../components/PictureUploadForm";
import { useNavigate ,useParams } from "react-router-dom";


export const ProfilePage = () => {
  const {profileId} = useParams()
  const navigate = useNavigate()
  const closePage = (event)=>{
    event.preventDefault()
    navigate(`/dashboard/${profileId}`)
  } 
  

  return (
    <div className="bg-[#36393f] h-screen w-full profile-container">
    <div className=" mx-auto">
      <main className="bg-base-300 rounded-xl pt-6 space-y-8  w-full ">
  
        {/* Flex container for top row */}
        <div className="flex justify-end px-4 w-full">
          <X 
            onClick={closePage} 
            className="text-white bg-slate-900 hover:text-red-500 rounded-full p-2 border border-white text-3xl cursor-pointer" 
            width={45} 
            height={45}
          />
        </div>
  
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>
  
        {/* Picture Upload and Forms */}
        <PictureUploadForm />
        <UpdateProfileForm />
      </main>
    </div>
  </div>
  );
};
