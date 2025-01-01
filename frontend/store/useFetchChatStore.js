import { create } from "zustand";

export const useFetchChatStore = create((set) => ({
  chats: [], 

  setChats: (newChats) => set({ chats: newChats }),
  addChat: (newChat) => set((state) => ({ chats: [...state.chats, newChat] })), // Add a new chat
}));
