import {create} from 'zustand'
// import { useParams } from 'react-router-dom';

export const useProfileStore = create((set) => ({ 
    
    user: {
      username: '',
      profileId: '',
      email: '',
      profilePic: '', 
    },
    loading : true,
    setUser: (newUserData) => set({ user: { ...newUserData } }),
    setLoading : (isLoading) => set({loading:isLoading})
  }));
  
  //create fetchUser function to fetch data from mongodb and then use that response to update user ? 
  // access user from passport auth and then uodate? this cant be done right since auth is backend while fetch user is frontend. so that means 
  //i need to send a get request to lets say /api/users/:profileId ? 