import { Camera } from "lucide-react"

export const PictureUploadForm = ()=>{

    return(
        <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={"/avatar.png"}
            alt="Profile"
            className="size-32 rounded-full object-cover border-4 "
          />
          <label
            htmlFor="avatar-upload"
            className={`
              absolute bottom-0 right-0 
              bg-base-content hover:scale-105
              p-2 rounded-full cursor-pointer 
              transition-all duration-200
            `}
          >
            <Camera className="w-5 h-5 text-base-200" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              
            />
          </label>
        </div>
        <p className="text-sm text-zinc-400">
        </p>
      </div>
    )
}