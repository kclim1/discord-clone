import axios from "axios";

export const fetchSession = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_ROUTE}/auth/session`, {
      withCredentials: true,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    return null;
  }
};
