import { create } from "zustand";

export const useFriendsStore = create((set) => ({
  senderId: "", // Current user's ID
  receiverId: "", // Friend's ID for interactions
  setSenderId: (id) => set({ senderId: id }),
  setReceiverId: (id) => set({ receiverId: id }),
  clearReceiverId: () => set({ receiverId: "" }), 
}));
