import { create } from "zustand";

export const useFriendListStore = create((set) => ({
    friendList: [], // Initialize as an empty array
    setFriendList: (friends) => {      
      set({ friendList: friends });
    },
  }));