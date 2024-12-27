import axios from "axios";

export const fetchOneFriend = async (friendId) => {
  try {
    const response = await axios.get(`/friends/${friendId}`); // Pass friendId as a query parameter
    console.log("Fetched Friend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching friend:", error.message);
    throw error;
  }
};
