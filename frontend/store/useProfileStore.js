import {create} from 'zustand'

export const useProfileStore = create((set) => ({ 
    
    user: {
      username: '',
      profileId: '',
      email: '',
      profilePic: '', 
    },
    loading : true,
    setUser: (newUserData) =>
      set((state) => ({
        user: { ...state.user, ...newUserData },
      })),    
    setLoading : (isLoading) => set({loading:isLoading})
  }));
  
  