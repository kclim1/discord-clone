import { ClipLoader } from "react-spinners";

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
    <ClipLoader color="#FFD700" size={60} />
    <span className="ml-4 text-lg">Loading...</span>
  </div>
);
