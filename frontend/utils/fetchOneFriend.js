import axios from "axios";


export const fetchOneFriend = async (profileId, friendId) => {
  try {
    const response = await axios.get(`http://localhost:3000/profiles/${profileId}/friends/${friendId}`);
    console.log("Fetched Participant Profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching participant profile:", error.message);
    throw error;
  }
};


