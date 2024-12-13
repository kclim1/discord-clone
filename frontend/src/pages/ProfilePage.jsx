import { UpdateProfileForm } from "../components/UpdateProfileForm";
// import {Camera} from 'lucide-react'
import { X } from "lucide-react";
import { PictureUploadForm } from "../components/PictureUploadForm";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const navigate = useNavigate()
  const closePage = (event)=>{
    event.preventDefault()
    navigate('/dashboard')
  } 
  return (
    <div className=" bg-slate-400  h-full w-full ">
      <X onClick={closePage} className="absolute top-16 right-8 text-white bg-slate-900 hover:text-red-500 rounded-full p-2 border border-white text-3xl" width={45} height={45}/>
      <div className="max-w-2xl mx-auto  ">
        <main className="bg-base-300  rounded-xl pt-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your Profile Information</p>
          </div>
          {/* picture goes here */}
          <PictureUploadForm/>
          {/* 2.19.37 timestamp  */}

          <div className="text-center">PICTURE GOES HERE</div>
          <UpdateProfileForm />
        </main>
      </div>
    </div>
  );
};
