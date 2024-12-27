import axios from 'axios';
import { useUserStore } from "../store/useUserStore";

export const fetchSession = async () => {
  try {
    // Make a GET request to the backend session endpoint
    const response = await axios.get('http://localhost:3000/auth/session', {
      withCredentials: true, // Ensure cookies are included in the request
    });

    // Extract data from the response
    const data = response.data;

    // Update Zustand store based on the session status
    if (data.isAuthenticated) {
      useUserStore.getState().setOnline(); // Update Zustand to online
    } else {
      useUserStore.getState().setOffline(); // Update Zustand to offline
    }
  } catch (error) {
    console.error('Error checking session:', error);
    useUserStore.getState().setOffline(); // Set offline on error
  }
};
