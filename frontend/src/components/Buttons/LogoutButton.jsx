import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        //with credentials is a specific  property required by axios and browser 
      const response = await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });

      if (response.status === 200) {
        console.log(response.data.message); 
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
      Logout
    </button>
  );
};
