import axios from "axios";

export const fetchFriends = async (profileId) => {
  
  try {
    const response = await axios.get(`http://localhost:3000/friends/${profileId}`);
    console.log('this is the response from fetchFriends',response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw error; 
  }
};



