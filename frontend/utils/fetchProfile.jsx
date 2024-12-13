import axios from "axios";
import { useProfileStore } from "../store/useProfileStore";

// Profile ID is passed down as a prop by Dashboard
export const fetchProfile = async (profileId) => {
  const { setUser, setLoading } = useProfileStore.getState(); // Access Zustand actions

  try {
    setLoading(true); 

    const response = await axios.get(`http://localhost:3000/user/${profileId}`);
    if (response.status === 200) {
      const { username, email, profilePic } = response.data;
      setUser({
        username,
        email,
        profilePic,
      });
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  } finally {
    setLoading(false); 
  }
};
