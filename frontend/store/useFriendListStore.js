import { create } from "zustand";

export const useFriendListStore = create((set) => ({
    friendList: [], // Initialize as an empty array
    setFriendList: (friends) => {
      console.log("Updating friendList with value:", friends); // Log every update
      
      set({ friendList: friends });
    },
  }));