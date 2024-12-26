import axios from "axios";
 
export const fetchChat = async (profileId) => {
  try {
    const response = await axios.get(`http://localhost:3000/chats/${profileId}`);
    console.log('this is fetchChat response ',response.data)
    return response.data; // Return the fetched chat data
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw new Error("Failed to fetch chats. Please try again.");
  }
};

//fetches all chat the user is involved in 