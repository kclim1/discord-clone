import { Camera } from "lucide-react";
import { useProfileStore } from "../../../store/useProfileStore";

export const PictureUploadForm = () => {
  const { user, setUser } = useProfileStore(); // Access Zustand store

  // Function to configure and open the Cloudinary widget
  const handleUploadWidget = () => {
    if (!window.cloudinary) {
      console.error("Cloudinary script not loaded!");
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_PRESET_NAME,
        sources: ["local", "url", "camera"], // Enable uploads from these sources
        cropping: true, // Allow cropping (optional)
        multiple: false, // Single file upload
        folder: "profile_pics", // Optional folder to organize uploads
        tags: ["profile"], // Optional tags
        resourceType: "image", // Only allow images
        showAdvancedOptions: false,
        showPoweredBy: false,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const secureUrl = result.info.secure_url;

          setUser({ profilePic: secureUrl }); 
          console.log("Secure URL:", secureUrl);
          console.log('profile pic uploaded succesfully')
        } else if (error) {
          console.error("Upload Widget Error:", error);
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Display current image or uploaded image */}
        <img
          src={user.profilePic || "/avatar.png"} 
          alt="Profile"
          className="size-32 rounded-full object-cover border-4"
        />

        {/* The camera icon triggers the Cloudinary widget */}
        <div
          className={`
            absolute bottom-0 right-0 
            bg-base-content hover:scale-105
            p-2 rounded-full cursor-pointer 
            transition-all duration-200
          `}
          onClick={handleUploadWidget} // Open the upload widget on click
        >
          <Camera className="w-5 h-5 text-base-200" />
        </div>
      </div>

      <p className="text-sm text-zinc-400">
        Click the camera icon to upload a new picture
      </p>
    </div>
  );
};
