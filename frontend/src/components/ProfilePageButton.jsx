import { useParams , useNavigate } from "react-router-dom";

export const ProfilePageButton = () => {
    const {profileId} = useParams()
    const navigate = useNavigate()
    const handleClick = ()=>{
        console.log('succesfully navigated to profile page')
        navigate(`/dashboard/${profileId}/profile`)
    }

  return (
    <div>
      <button  onClick={handleClick} className="bg-blue-500 text-white py-2 px-4 rounded">
        PROFILE PAGE
      </button>
    </div>
  );
};
