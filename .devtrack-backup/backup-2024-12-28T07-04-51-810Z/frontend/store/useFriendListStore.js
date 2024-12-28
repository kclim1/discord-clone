import { create } from "zustand";

export const useFriendListStore = create((set) => ({
    friendList: [], // Initialize as an empty array
    setFriendList: (friends) => {
      console.log("Updating friendList with value:", friends); // Log every update
      if (!Array.isArray(friends)) {
        console.error("Invalid value assigned to friendList:", friends); // Log invalid values
      }
      set({ friendList: friends });
    },
  }));